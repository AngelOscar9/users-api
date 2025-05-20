import express from 'express';
import userRoutes from '../modules/users/router.js';

const router = express.Router();

router.use('/users', userRoutes);

export default router;
