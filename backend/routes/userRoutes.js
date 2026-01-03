const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/userController');

// When someone posts to /login, run the authUser logic
router.post('/login', authUser);
router.route('/').post(registerUser); // Route for Registration

module.exports = router;