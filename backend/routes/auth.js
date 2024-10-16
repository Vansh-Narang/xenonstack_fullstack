const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config(); // Load the .env variables
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ msg: 'User registered' });
    } catch (err) {
        res.status(500).json({ msg: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user._id,
            },
        };

        // Sign the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,  // Use the secret from .env
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Return the token to the client
            }
        );
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Logout (on the frontend, you'd remove the token from storage)

module.exports = router;
