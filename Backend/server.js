// server.js (Node.js + Express)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Define a schema and model for cycle data
const cycleSchema = new mongoose.Schema({
    lastPeriod: Date,
    cycleLength: Number,
});

const Cycle = mongoose.model('Cycle', cycleSchema);

// API endpoint to save cycle data
app.post('/api/cycles', async(req, res) => {
    const { lastPeriod, cycleLength } = req.body; // Extract data from request body

    try {
        const newCycle = new Cycle({ lastPeriod, cycleLength }); // Create a new cycle document
        await newCycle.save(); // Save it to the database
        res.status(201).json(newCycle); // Send back the saved data
    } catch (error) {
        res.status(500).json({ message: 'Error saving cycle data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));