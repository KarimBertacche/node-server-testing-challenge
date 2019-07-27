const express = require('express');

const authRouter = require('../auth/auth-router');

const server = express();

server.use(express.json());
server.use('/api', authRouter);

server.get('/', (req, res) => {
    res.send('Server up and running Yay!!')
});

module.exports = server;