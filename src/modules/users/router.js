import express from 'express';
import { listUsers, getUser, createUser } from './controller.js';

const router = express.Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);

export default router;