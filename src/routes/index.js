import express from 'express';
import userRoutes from '../modules/users/router.js';
import healthRoutes from '../modules/health/router.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/users', userRoutes);

export default router;
