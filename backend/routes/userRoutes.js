import express from 'express';
import { adminlogin } from '../controller/userController.js';
import { loginLimiter } from '../middleware/rateLimitMiddleware.js';

const userrouter = express.Router();

// Only keep admin login route
userrouter.post('/admin', loginLimiter, adminlogin);

export default userrouter;