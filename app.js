const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors({
    origin: 'http://localhost:3000' // Allow only this origin
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.error("MongoDB connection error:", err));

// Import routes
const farmerRoutes = require('./routes/farmerRoutes'); // Adjust the path if necessary
const serviceRoutes = require('./routes/services'); // Adjust the path if necessary
const authRoutes = require('./routes/auth'); // Ensure this path is correct
const advisoryRoutes = require('./routes/advisories'); // Import advisory routes

// Use routes
app.use('/api/farmers', farmerRoutes); // Base URL for farmer routes
app.use('/api/services', serviceRoutes); // Base URL for service routes
app.use('/api/auth', authRoutes); // Base URL for authentication routes
app.use('/api/advisories', advisoryRoutes); // Base URL for advisory routes

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
