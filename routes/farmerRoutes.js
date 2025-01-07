const express = require('express');
const Farmer = require('../models/Farmer');
const router = express.Router();

// Create a new farmer
router.post('/', async (req, res) => {
    try {
        const farmer = new Farmer(req.body);
        await farmer.save();
        res.status(201).json(farmer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a farmer
router.put('/:id', async (req, res) => {
    try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        res.json(updatedFarmer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a farmer
router.delete('/:id', async (req, res) => {
    try {
        const deletedFarmer = await Farmer.findByIdAndDelete(req.params.id);
        if (!deletedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        res.json({ message: 'Farmer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
