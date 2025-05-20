import express from 'express';
import { listUsers, getUser, createUser } from './controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Angel O. Gonzalez
 *                 dni: "40218598122"
 */
router.get('/', listUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Angel O. Gonzalez
 *               dni: "40218598122"
 *       404:
 *         description: User not found
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dni
 *             properties:
 *               name:
 *                 type: string
 *                 example: Angel O. Gonzalez
 *               dni:
 *                 type: string
 *                 example: "40218598122"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Angel O. Gonzalez
 *               dni: "40218598122"
 *       400:
 *         description: User already exists or invalid input
 */
router.post('/', createUser);

export default router;
