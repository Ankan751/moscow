import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY;
const channelHandle = '@haven_homes_punjab';

console.log('API Key:', apiKey ? 'FOUND' : 'MISSING');
console.log('Fetching for handle:', channelHandle);

async function test() {
  try {
    const channelRes = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'id,contentDetails',
        forHandle: channelHandle,
        key: apiKey
      }
    });
    console.log('Channel Res:', JSON.stringify(channelRes.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

test();
