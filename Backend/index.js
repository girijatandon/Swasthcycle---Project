import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables

const app = express(); // Initialize the Express application

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3001', // Adjust this to your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers)
}));

// MongoDB connection
const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri); // Check if URI is being loaded correctly

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Define a simple route
app.get("/", (req, res) => {
    res.send("Server is ready");
});

// Define API route for saving cycle data
app.post("/api/cycles", async(req, res) => {
    const { lastPeriod, cycleLength } = req.body;

    // Example: Save cycle data to the database (add your model and save logic here)
    try {
        // Assuming you have a Cycle model set up
        const cycleData = new Cycle({ lastPeriod, cycleLength });
        await cycleData.save();
        res.status(201).json(cycleData);
    } catch (error) {
        console.error("Error saving cycle data:", error);
        res.status(500).json({ message: "Error saving cycle data" });
    }
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});