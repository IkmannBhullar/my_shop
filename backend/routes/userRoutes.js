const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController');

// When someone posts to /login, run the authUser logic
router.post('/login', authUser);

module.exports = router;