import {
    listUsers,
    getUser,
    createUser,
    updateUser,
} from './controller.js';

import express from 'express';

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
 *               statusCode: 200
 *               message: Users found
 *               data:
 *                 - id: 1
 *                   name: Angel O. Gonzalez
 *                   dni: "40218598122"
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
 *               statusCode: 200
 *               message: User found
 *               data:
 *                 id: 1
 *                 name: Angel O. Gonzalez
 *                 dni: "40218598122"
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
 *               statusCode: 201
 *               message: User created
 *               data:
 *                 id: 2
 *                 name: Angel O. Gonzalez
 *                 dni: "40218598123"
 *       400:
 *         description: User already exists or invalid input
 */
router.post('/', createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               dni:
 *                 type: string
 *                 example: "40218598124"
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: User updated
 *               data:
 *                 id: 2
 *                 name: Updated Name
 *                 dni: "40218598124"
 *       404:
 *         description: User not found
 */
router.put('/:id', updateUser);

export default router;
