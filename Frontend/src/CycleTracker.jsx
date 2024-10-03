import { useState } from 'react';

const CycleTracker = () => {
    const [lastPeriod, setLastPeriod] = useState('');
    const [cycleLength, setCycleLength] = useState(28);
    const [nextPeriod, setNextPeriod] = useState('');

    const calculateNextPeriod = () => {
        if (!lastPeriod) return; // Ensure a date is selected
        const lastPeriodDate = new Date(lastPeriod);
        const nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(lastPeriodDate.getDate() + Number(cycleLength)); // Calculate next period
        setNextPeriod(nextPeriodDate.toDateString());
    };

    return (
        <div className="cycle-tracker">
            <h1>Menstrual Cycle Tracker</h1>
            <div className="input-group">
                <label htmlFor="lastPeriod">Last Period Date:</label>
                <input
                    type="date"
                    id="lastPeriod"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="cycleLength">Cycle Length (days):</label>
                <input
                    type="number"
                    id="cycleLength"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))} // Convert input value to number
                    min="21"
                    max="35"
                />
            </div>
            <button onClick={calculateNextPeriod}>Calculate Next Period</button>
            {nextPeriod && (
                <div className="result">
                    <h3>Your next period is expected on: {nextPeriod}</h3>
                </div>
            )}
        </div>
    );
};

export default CycleTracker;
