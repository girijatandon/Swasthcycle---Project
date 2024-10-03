// db.js
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/menstrualTracker', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

// Define a Mongoose schema and model for menstrual cycles
const cycleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cycleId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    periodLength: { type: Number, required: true },
    cycleLength: { type: Number, required: true },
    flow: { type: String, required: true },
    symptoms: { type: [String], required: true },
    notes: { type: String }
});

const Cycle = mongoose.model('Cycle', cycleSchema);

// Sample menstrual cycle data
const menstrualCycles = [{
        userId: 'user123',
        cycleId: 'cycle1',
        startDate: new Date('2023-03-01'),
        endDate: new Date('2023-03-28'),
        periodLength: 5,
        cycleLength: 28,
        flow: 'medium',
        symptoms: ['cramps', 'bloating'],
        notes: 'First day of period was heavy, but flow decreased over time.'
    },
    {
        userId: 'user123',
        cycleId: 'cycle2',
        startDate: new Date('2023-04-01'),
        endDate: new Date('2023-04-29'),
        periodLength: 6,
        cycleLength: 29,
        flow: 'heavy',
        symptoms: ['mood swings', 'fatigue'],
        notes: 'Period was longer than usual, and symptoms were more severe.'
    },
    {
        userId: 'user456',
        cycleId: 'cycle1',
        startDate: new Date('2023-02-15'),
        endDate: new Date('2023-03-14'),
        periodLength: 4,
        cycleLength: 27,
        flow: 'light',
        symptoms: ['cramps'],
        notes: 'First period after starting birth control, flow was lighter than usual.'
    }
];

// Function to insert data
const insertData = async() => {
    try {
        await Cycle.insertMany(menstrualCycles);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }
};

// Connect to the database and insert data
connectDB().then(() => {
    insertData().then(() => {
        mongoose.connection.close(); // Close the connection after data insertion
    });
});