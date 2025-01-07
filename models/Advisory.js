// models/Advisory.js
const mongoose = require('mongoose');

const AdvisorySchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user or farmer
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Advisory', AdvisorySchema);
