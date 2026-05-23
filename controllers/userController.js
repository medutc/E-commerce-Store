// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate a secure login token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // User stays logged in for 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/users
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash the password (Encryption)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error during registration' });
    }
};

// @desc    Authenticate a user (Login)
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists AND if the un-hashed password matches the hashed one in the database
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error during login' });
    }
};

module.exports = { registerUser, loginUser };