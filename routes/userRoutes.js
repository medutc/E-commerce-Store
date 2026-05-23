// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// POST request to register
router.post('/', registerUser);

// POST request to login
router.post('/login', loginUser);

module.exports = router;