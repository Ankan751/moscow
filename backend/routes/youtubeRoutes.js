import express from 'express';
import { getLatestVideos } from '../controller/youtubeController.js';

const router = express.Router();

// GET /api/youtube/latest
router.get('/latest', getLatestVideos);

export default router;
