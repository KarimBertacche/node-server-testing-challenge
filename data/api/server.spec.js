const server = require('./server');
const request = require('supertest');

describe('server', () => {
    it('[GET] / WORKS', () => {
        return request(server)
            .get('/')
            .expect(200)
    });
});