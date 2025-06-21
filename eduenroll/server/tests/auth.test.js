import request from 'supertest';
import app from '../app.js';

describe('JWT Authentication Tests', () => {
    let token
    it('logs in with valid credentials and returns a token', async () => {
        const res = await request(app)
        .post('/eduenroll/api/users/login')
        .send({
            username: 'testuser',
            password: 'testpassword'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.accessToken).toBeDefined();
        token = res.body.accessToken; // Store the token for later use
    });

    it('accesses a protected route with valid token', async () => {
        const res = await request(app)
        .get('/eduenroll/api/courses')
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    it('rejects login with invalid credentials', async () => {
        const res = await request(app)
        .post('/eduenroll/api/users/login')
        .send({
            username: 'wronguser',
            password: 'wrongpassword'
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Invalid username or password');
    });

    it('rejects access to protected route without token', async () => {
        const res = await request(app)
        .get('/eduenroll/api/courses');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Access token is missing');
    });

    it('rejects access to protected route with invalid token', async () => {
        const res = await request(app)
        .get('/eduenroll/api/courses')
        .set('Authorization', 'Bearer invalidtoken');
        expect(res.statusCode).toEqual(403);
        expect(res.body).toHaveProperty('error', 'Invalid access token');
    });
});