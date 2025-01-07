const mongoose = require('mongoose');

const marketPricesSchema = new mongoose.Schema({
    State: String,
    District: String,
    Market: String,
    Commodity: String,
    Variety: String,
    Grade: String,
    Arrival_Date: String,
    Min_Price: Number,
    Max_Price: Number,
    Modal_Price: Number
});

module.exports = mongoose.model('MarketPrices', marketPricesSchema);
