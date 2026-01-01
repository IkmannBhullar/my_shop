// this is chekcing if the request has a Bearer token attached
// Decodes the token to find the user ID
// Attach users to request so next functions know who they are
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check if the "Authorization" header is present and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header (remove "Bearer " string)
            token = req.headers.authorization.split(' ')[1];

            // Decode the token to get the User ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the DB and attach it to the request
            // (We leave out the password for security)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Allow them to pass!
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };

