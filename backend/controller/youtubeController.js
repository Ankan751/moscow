import SearchCache from '../models/searchCacheModel.js';
import { fetchLatestVideos } from '../services/youtubeService.js';
import logger from '../utils/logger.js';

const CACHE_KEY = 'youtube_latest_videos';
const CACHE_TTL_DAYS = 5;
const CACHE_TTL_SECONDS = CACHE_TTL_DAYS * 24 * 60 * 60;

/**
 * Controller to get latest YouTube videos with caching
 */
export const getLatestVideos = async (req, res) => {
  try {
    console.log('YouTube Controller: Checking cache...');
    const cachedData = await SearchCache.findOne({ cacheKey: CACHE_KEY });

    if (cachedData) {
      console.log('YouTube Controller: Found cached data');
      // Check if expired (SearchCache has a TTL index, but we can double check)
      const now = new Date();
      const expirationDate = new Date(cachedData.createdAt.getTime() + CACHE_TTL_SECONDS * 1000);

      if (now < expirationDate) {
        console.log('YouTube Controller: Cache is valid');
        return res.status(200).json({
          success: true,
          data: cachedData.data,
          fromCache: true
        });
      }

      console.log('YouTube Controller: Cache expired');
      // If expired manually (in case TTL index hasn't kicked in), delete it
      await SearchCache.deleteOne({ cacheKey: CACHE_KEY });
    }

    // 2. Fetch fresh data
    console.log('YouTube Controller: Fetching fresh data...');
    const videos = await fetchLatestVideos();

    // 3. Update cache
    // We use findOneAndUpdate with upsert to avoid duplicate key errors
    await SearchCache.findOneAndUpdate(
      { cacheKey: CACHE_KEY },
      {
        data: videos,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: videos,
      fromCache: false
    });
  } catch (error) {
    logger.error('Error in youtubeController:', error.message);

    // If API fails but we have old cache, maybe return that as fallback?
    // For now, just return error
    res.status(500).json({
      success: false,
      message: 'Failed to fetch YouTube videos',
      error: error.message
    });
  }
};
