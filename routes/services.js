const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Create a new service
router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a service
router.put('/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).send({ message: 'Service not found' });
        }
        res.send(updatedService);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).send({ message: 'Service not found' });
        }
        res.send({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
