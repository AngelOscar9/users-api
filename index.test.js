import app from './src/app.js';
import request from 'supertest';
import User from './src/modules/users/model.js';

describe('User API', () => {
    const data = {
        dni: '1234567890',
        name: 'Test',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/users - should return list of users', async () => {
        jest.spyOn(User, 'findAll').mockResolvedValue([data]);

        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            statusCode: 200,
            message: 'Users found',
            data: [data],
        });
    });

    test('GET /api/users/:id - should return a user', async () => {
        const userWithId = { ...data, id: 1 };
        jest.spyOn(User, 'findByPk').mockResolvedValue(userWithId);

        const response = await request(app).get('/api/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            statusCode: 200,
            message: 'User found',
            data: userWithId,
        });
    });

    test('POST /api/users - should create a user', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(null);
        jest.spyOn(User, 'create').mockResolvedValue({ ...data, id: 1 });

        const response = await request(app).post('/api/users').send(data);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            statusCode: 201,
            message: 'User created',
            data: { ...data, id: 1 },
        });
    });

    test('PUT /api/users/:id - should update a user', async () => {
        const userId = 1;
        const updateData = { name: 'Updated Name' };
        const existingUser = {
            ...data,
            id: userId,
            update: jest.fn().mockResolvedValue(true),
        };

        jest.spyOn(User, 'findByPk').mockResolvedValue(existingUser);
        jest.spyOn(User, 'findOne').mockResolvedValue(existingUser); // Simula que no hay conflicto

        const response = await request(app).put(`/api/users/${userId}`).send(updateData);

        expect(User.findByPk).toHaveBeenCalledWith(`${userId}`);
        expect(existingUser.update).toHaveBeenCalledWith(updateData);

        // Eliminar la función update del objeto para comparación
        const { update, ...userWithoutUpdate } = existingUser;

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            statusCode: 200,
            message: 'User updated',
            data: userWithoutUpdate,
        });
    });

    test('PUT /api/users/:id - should fail if user ID is invalid', async () => {
        const response = await request(app).put('/api/users/abc').send({ name: 'Invalid' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            message: 'Invalid or missing user ID',
        });
    });

    test('PUT /api/users/:id - should fail if user is not found', async () => {
        jest.spyOn(User, 'findByPk').mockResolvedValue(null);

        const response = await request(app).put('/api/users/999').send({ name: 'NoUser' });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            statusCode: 404,
            message: 'User not found with ID 999',
        });
    });

    test('PUT /api/users/:id - should fail if dni is already in use', async () => {
        const existingUser = { id: 1, name: 'User A', dni: '111', update: jest.fn() };
        const conflictingUser = { id: 2, name: 'User B', dni: data.dni };

        jest.spyOn(User, 'findByPk').mockResolvedValue(existingUser);
        jest.spyOn(User, 'findOne').mockResolvedValue(conflictingUser);

        const response = await request(app).put('/api/users/1').send({ dni: data.dni });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            statusCode: 400,
            message: 'DNI already in use by another user',
        });
    });

    test('PUT /api/users/:id - should handle internal server error', async () => {
        jest.spyOn(User, 'findByPk').mockRejectedValue(new Error('Unexpected DB error'));

        const response = await request(app).put('/api/users/1').send({ name: 'Crash' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    });
});
