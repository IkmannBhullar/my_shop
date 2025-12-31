// backend/data/users.js
const bcrypt = require('bcryptjs'); // We'll install this in a second

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // We will encrypt this later
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

module.exports = users;