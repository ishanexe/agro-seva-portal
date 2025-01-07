const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model
const Farmer = require('../models/Farmer'); // Your Farmer model
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'farmer') {
            // Create a new Farmer instance
            const newFarmer = new Farmer({
                name,
                email,
                password: hashedPassword,
            });

            // Save the farmer to the farmers collection
            await newFarmer.save();
        } else {
            // Create a new User instance
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            // Save the user to the users collection
            await newUser.save();
        }

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for a user in both collections
        let user = await User.findOne({ email });
        if (!user) {
            user = await Farmer.findOne({ email });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
