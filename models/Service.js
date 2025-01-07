const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);
