const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // We create a token using the User's ID and a secret key
    // This token will expire in 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;