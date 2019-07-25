const db = require('../db-config');
const Users = require('./auth-model');

beforeEach(async () => {
    await db('users').truncate();
});

describe('[POST] /register, insert user', () => {
    it('is able to register a new user to the db!', async () => {
        let users = await Users.getAll();
        expect(users).toHaveLength(0);

        await Users.registerUser({ username: 'Anthony', password: 12345 });
        await Users.registerUser({ username: 'Gabe', password: 12345 });

        users = await Users.getAll();
        expect(users).toHaveLength(2);
    });

    it('is able to insert the correct user', async () => {
        let users = await Users.getAll();
        expect(users).toHaveLength(0);

        await Users.registerUser({ username: 'Anthony', password: 12345  });
        await Users.registerUser({ username: 'Gabe', password: 12345 });
        users = await Users.getAll();

        expect(users[0].username).toBe('Anthony');
        expect(users[1].username).toBe('Gabe');
    });

    it('returns the newly inserted user', async () => {
        const user = await Users.registerUser({ username: 'Anthony', password: 12345 });
        expect(user[0].username).toBe('Anthony');
    });
});

describe('[DELETE] /users/:id, remove user', () => {
    it('is able to delete a user from the db!', async () => {
        let users = await Users.getAll();
        expect(users).toHaveLength(0);

        await Users.registerUser({ username: 'Anthony', password: 12345 });
        await Users.registerUser({ username: 'Gabe', password: 12345 });
        users = await Users.getAll();
        expect(users).toHaveLength(2);

        await Users.removeUser(1);
        users = await Users.getAll();
        expect(users).toHaveLength(1);
    });
});