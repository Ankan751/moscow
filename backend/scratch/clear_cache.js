import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SearchCache from '../models/searchCacheModel.js';

dotenv.config();

const clearYoutubeCache = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/project-seattle');
    console.log('Connected to MongoDB');
    
    const result = await SearchCache.deleteOne({ cacheKey: 'youtube_latest_videos' });
    console.log('Deleted YouTube cache:', result);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

clearYoutubeCache();
