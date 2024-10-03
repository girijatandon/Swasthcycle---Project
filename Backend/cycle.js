// Cycle.js
import mongoose from 'mongoose';

const cycleSchema = new mongoose.Schema({
    lastPeriod: { type: Date, required: true },
    cycleLength: { type: Number, required: true },
});

const cycle = mongoose.model('cycle', cycleSchema);

export default cycle;