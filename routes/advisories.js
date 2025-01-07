// routes/advisories.js
const express = require('express');
const router = express.Router();
const Advisory = require('../models/Advisory');

// Post an advisory
router.post('/', async (req, res) => {
    const { content, author } = req.body;

    const newAdvisory = new Advisory({
        content,
        author,
    });

    try {
        const savedAdvisory = await newAdvisory.save();
        res.status(201).json(savedAdvisory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all advisories
router.get('/', async (req, res) => {
    try {
        const advisories = await Advisory.find().populate('author', 'name'); // Adjust to include user info
        res.json(advisories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
