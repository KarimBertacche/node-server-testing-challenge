const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model');
const secret = require('../secrets/secrets');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(username && password) {
            password = bcrypt.hashSync(password, 12);

            const user = await db.registerUser({ username, password });

            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'Missing credentials'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while registering user'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(username && password) {
            const user = await db.getUserBy({ username });

            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({
                    message: `Welcome ${user.username}`,
                    token
                });

            } else {
                res.status(404).json({
                    message: 'Invalid Credentials'
                });
            }
        } else {
            res.status(404).json({
                message: 'Missing credentials'
            }); 
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while logging in user'
        });
    }
});

function generateToken(user) {
    const payload = {
        UserId: user.id,
        name: user.username
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;