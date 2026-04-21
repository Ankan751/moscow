/**
 * Mapping of localities to their immediate neighbors for expanded search.
 */
export const NEARBY_LOCALITIES = {
    "model town": ["lajpat nagar", "mota singh nagar", "new jawahar nagar", "model town extension"],
    "rama mandi": ["deep nagar", "jalandhar cantt", "dakoha"],
    "urban estate": ["phase 1", "phase 2", "chhoti baradari", "income tax colony"],
    "phagwara gate": ["mai hiran gate", "shah-ka-paisa", "milap chowk"],
    "66 feet road": ["phullanwal", "urban estate phase 2", "jalandhar heights"],
    "adroit": ["ncr", "delhi"],
};

/**
 * Mapping of cities to nearby smaller towns or satellite areas.
 */
export const NEARBY_TOWNS = {
    "jalandhar": ["kartarpur", "adampur", "alawalpur", "bhogpur", "shahkot", "nakodar"],
    "amritsar": ["rayya", "beas", "majitha"],
    "ludhiana": ["sahnewal", "mullanpur", "doraha"],
    "chandigarh": ["mohali", "panchkula", "zirakpur", "kharar"],
};

/**
 * Gets all related search terms for a locality/city.
 */
export const getExpandedSearchTerms = (type, value) => {
    if (!value) return [];
    const normalized = value.toLowerCase().trim();
    
    if (type === 'locality') {
        return NEARBY_LOCALITIES[normalized] || [];
    }
    
    if (type === 'city') {
        return NEARBY_TOWNS[normalized] || [];
    }
    
    return [];
};
