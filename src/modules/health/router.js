import express from 'express';
import { getHealthStatus } from './controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns health status
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: API is healthy
 *               timestamp: 2025-05-20T23:00:00.000Z
 */
router.get('/', getHealthStatus);

export default router;
