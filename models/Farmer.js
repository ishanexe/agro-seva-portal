const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // You can add other relevant fields for farmers
});

module.exports = mongoose.model('Farmer', FarmerSchema);
