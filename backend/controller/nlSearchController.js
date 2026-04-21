import Property from '../models/propertyModel.js';
import { parseWithGrok } from '../services/grokService.js';
import logger from '../utils/logger.js';
import { getExpandedSearchTerms } from '../utils/geoMapping.js';

// 5. Validation Layer
export function validate(data, originalQuery = '') {
  // Check if BHK was explicitly provided by the AI or mentioned in the query
  const hasBHKInQuery = /bhk|bedroom|room|rk/i.test(originalQuery);
  const hasBHKInParsed = data.bhk && data.bhk.preferred && data.bhk.preferred.length > 0;
  
  data.bhkSpecified = hasBHKInQuery || hasBHKInParsed;

  if (!data.city) throw new Error("City required");

  if (!data.bhk || !data.bhk.preferred || !data.bhk.preferred.length) {
    data.bhk = data.bhk || {};
    data.bhk.preferred = [2]; // Default for internal scoring if not specified
  }

  if (!data.budget || !data.budget.max) {
    data.budget = data.budget || {};
    data.budget.max = 1000000000; // 100 Crore (effectively no limit)
  }

  return data;
}

// 6. Hard Filters (Minimal)
export function buildQuery(data) {
  const query = {
    status: 'active'
  };

  // Expand City Search (Combine Hardcoded + AI suggestions)
  const nearbyTownsStatic = getExpandedSearchTerms('city', data.city);
  const nearbyTownsAI = data.nearby_towns || [];
  const cityTerms = [...new Set([data.city, ...nearbyTownsStatic, ...nearbyTownsAI])];

  query.city = { $in: cityTerms.filter(Boolean).map(c => new RegExp(c, 'i')) };

  // Expand Locality Search (Combine Hardcoded + AI suggestions)
  if (data.locality) {
    const nearbyLocalitiesStatic = getExpandedSearchTerms('locality', data.locality);
    const nearbyLocalitiesAI = data.nearby_localities || [];
    const localityTerms = [...new Set([data.locality, ...nearbyLocalitiesStatic, ...nearbyLocalitiesAI])];

    query.locality = { $in: localityTerms.filter(Boolean).map(l => new RegExp(l, 'i')) };
  }

  return query;
}

// 7.1 Price (Sigmoid Normalization)
function priceScore(price, budget) {
  const x = (price / budget) - 1;
  return 1 / (1 + Math.exp(8 * x));
}

// 7.2 BHK Score
function bhkScore(propertyBHK, preferred) {
  const diff = Math.abs(propertyBHK - preferred);
  if (diff === 0) return 1;
  if (diff === 1) return 0.6; // Close match
  return 0; // Too far off
}

// 7.3 Amenities + Tags
function amenitiesScore(property, user) {
  const requirements = [...(user.amenities || [])];

  if (user.derived_preferences?.transport_access) requirements.push('transport_access');
  if (user.derived_preferences?.school_nearby) requirements.push('school_nearby');
  if (user.derived_preferences?.premium_locality) requirements.push('premium_locality');

  if (requirements.length === 0) return 1.0; // 100% match if user has no specific demands

  const propertyFeatures = [...(property.amenities || []), ...(property.tags || [])];
  const matches = requirements.filter(req => 
      propertyFeatures.some(f => f.toLowerCase().includes(req.toLowerCase()))
  );

  return matches.length / requirements.length;
}

// 7.4 Final Score
export function calculateScore(property, user) {
  const propertyBHK = property.bhk || property.beds || 0;
  const p = priceScore(property.price, user.budget.max);
  const b = bhkScore(propertyBHK, user.bhk.preferred[0]);
  const a = amenitiesScore(property, user);
  
  // Type score
  let t = 1;
  if (user.type && property.type) {
      t = property.type.toLowerCase().includes(user.type.toLowerCase()) ? 1 : 0.7;
  }

  const diff = propertyBHK - user.bhk.preferred[0];
  const absDiff = Math.abs(diff);

  // Hard Filter: If bedrooms are too few (diff < -1), exclude it
  // ONLY if the user explicitly asked for a BHK configuration
  if (user.bhkSpecified && diff < -1) {
      return { 
          total: 0, 
          details: { priceScore: p, bhkScore: 0, amenitiesScore: a, typeScore: t, isWithinBudget: property.price <= user.budget.max, matchesBHK: false } 
      };
  }

  let score =
    0.35 * p +
    0.25 * (user.bhkSpecified ? b : 1.0) +
    0.25 * a +
    0.15 * t;

  // Apply specific BHK penalties only if BHK was requested
  if (user.bhkSpecified) {
      if (absDiff === 1) {
          score -= 0.05;
      } else if (absDiff > 1) {
          score -= (0.2 * absDiff);
      }
  }

  // ensure score doesn't go below 0
  score = Math.max(0, score);

  // NEARBY PENALTY (50% reduction for neighboring localities/towns)
  const requestedCity = (user.city || "").toLowerCase().trim();
  const requestedLocality = (user.locality || "").toLowerCase().trim();
  
  const propertyCity = (property.city || "").toLowerCase().trim();
  const propertyLocality = (property.locality || "").toLowerCase().trim();

  const isExactCity = !requestedCity || propertyCity === requestedCity;
  const isExactLocality = !requestedLocality || propertyLocality === requestedLocality;

  // If it's a match but not the exact primary one, penalize it
  if (!isExactCity || !isExactLocality) {
    score = score * 0.5;
  }

  // upgrade bonus
  if (
    propertyBHK === user.bhk.preferred[0] + 1 &&
    p > 0.6 &&
    isExactLocality // only give bonus for exact matches
  ) {
    score += 0.05;
  }

  // Final cap: score should never exceed 1.0 (100%)
  score = Math.min(1.0, score);

  return {
      total: score,
      details: {
          priceScore: p,
          bhkScore: b,
          amenitiesScore: a,
          typeScore: t,
          isWithinBudget: property.price <= user.budget.max,
          matchesBHK: propertyBHK === user.bhk.preferred[0]
      }
  };
}

// 8. Search API
export const nlSearch = async (req, res) => {
  try {
    const input = req.body.query;
    if (!input) {
        return res.status(400).json({ success: false, message: 'Query is required' });
    }

    logger.info('NL Search initiated', { input });

    const parsed = await parseWithGrok(input);
    const user = validate(parsed, input);
    const query = buildQuery(user);

    const properties = await Property.find(query);

    const ranked = properties
      .map(p => {
        const scoreObj = calculateScore(p, user);
        return {
          ...p.toObject(),
          score: scoreObj.total,
          scoreDetails: scoreObj.details
        };
      })
      .filter(p => p.score >= 0.4) // Filter out irrelevant matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json({
        success: true,
        results: ranked,
        parsed: user
    });
  } catch (error) {
    logger.error('NL Search error:', { error: error.message });
    res.status(500).json({
        success: false,
        message: error.message || 'Failed to perform natural language search'
    });
  }
};
