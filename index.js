require('dotenv').config();
const server = require('./data/api/server');
const port = 5000;

server.listen(port, () => {
    console.log(`** Server running on port ${port}`);
});