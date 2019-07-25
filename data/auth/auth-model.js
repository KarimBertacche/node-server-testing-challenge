const db = require('../db-config');

module.exports = {
    registerUser,
    getUserBy,
}

function registerUser(user) {
    return db('users').insert(user).then(id => {
        const [ userId ] = id;
        return db('users').where({ id: userId });
    });
}

function getUserBy(filter) {
    return db('users').where(filter).first();
}