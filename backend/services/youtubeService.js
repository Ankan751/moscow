import axios from 'axios';
import logger from '../utils/logger.js';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Service to handle YouTube API interactions
 */
export const fetchLatestVideos = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelHandle = '@Hanumant_properties';

  if (!apiKey) {
    logger.error('YOUTUBE_API_KEY is not defined in environment variables');
    throw new Error('YouTube API Key is missing');
  }

  try {
    // 1. Get Channel ID and Uploads Playlist ID from handle
    console.log('YouTube Service: Fetching channel...');
    const channelRes = await axios.get(`${YOUTUBE_API_URL}/channels`, {
      params: {
        part: 'id,contentDetails',
        forHandle: channelHandle,
        key: apiKey
      }
    });

    if (!channelRes.data.items || channelRes.data.items.length === 0) {
      throw new Error(`Channel not found for handle: ${channelHandle}`);
    }

    const channelId = channelRes.data.items[0].id;
    const uploadsPlaylistId = channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

    console.log(`YouTube Service: Found Channel ID: ${channelId}, Uploads Playlist ID: ${uploadsPlaylistId}`);

    // 2. Fetch latest 4 videos from the uploads playlist
    console.log('YouTube Service: Fetching playlist items...');
    const playlistRes = await axios.get(`${YOUTUBE_API_URL}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId: uploadsPlaylistId,
        maxResults: 20,
        key: apiKey
      }
    });

    if (!playlistRes.data.items) {
      return [];
    }

    // 3. Map to a clean format
    const videos = playlistRes.data.items.map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      publishedAt: item.snippet.publishedAt
    }));

    console.log(`YouTube Service: Successfully fetched ${videos.length} videos`);
    return videos;
  } catch (error) {
    logger.error('Error fetching YouTube videos:', {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
};
