import express from 'express';
import { nlSearch } from '../controller/nlSearchController.js';

const router = express.Router();

router.post('/search', nlSearch);

export default router;
