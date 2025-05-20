import User from './model.js';
import { LoggerService } from '../../config/logger.js';

const logger = new LoggerService('UsersController');

export const listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        logger.info('Listing users');

        res.status(200).json({
            statusCode: 200,
            message: 'Users found',
            data: users,
        });
    } catch (error) {
        logger.error('Error listing users', { error: error.message });
        res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid or missing user ID',
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: `User not found with ID ${id}`,
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: 'User found',
            data: user,
        });
    } catch (error) {
        logger.error('Error in getUser', { error: error.message });
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const userRequest = req.body;
        const userExist = await User.findOne({ where: { dni: userRequest.dni } });

        if (userExist) {
            return res.status(400).json({ statusCode: 400, message: 'User already exists' });
        }

        const user = await User.create(userRequest);

        res.status(201).json({
            statusCode: 201,
            message: 'User created',
            data: user,
        });
    } catch (error) {
        logger.error('Error creating user', { error: error.message });
        res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid or missing user ID',
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: `User not found with ID ${id}`,
            });
        }

        const { name, dni } = req.body;

        // Validar que no se use un DNI que ya exista para otro usuario
        if (dni) {
            const userWithSameDni = await User.findOne({ where: { dni } });
            if (userWithSameDni && userWithSameDni.id !== user.id) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'DNI already in use by another user',
                });
            }
        }

        await user.update({ name, dni });

        res.status(200).json({
            statusCode: 200,
            message: 'User updated',
            data: user,
        });
    } catch (error) {
        logger.error('Error updating user', { error: error.message });
        res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
};
