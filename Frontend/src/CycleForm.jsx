// src/CycleForm.jsx
import { useState } from 'react';

const CycleForm = () => {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cycleData = {
      lastPeriod,
      cycleLength: Number(cycleLength),
    };

    try {
      const response = await fetch('http://localhost:3000/api/cycles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cycleData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`Cycle data saved: ${JSON.stringify(result)}`);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving cycle data:', error);
      setMessage('Error saving cycle data');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>Menstrual Cycle Tracker</h2>
      <div>
        <label style={{ marginRight: '10px' }}>Last Period Date:</label>
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          required
        />
      </div>
      <div>
        <label style={{ marginRight: '10px' }}>Cycle Length (days):</label>
        <input
          type="number"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          min="21"
          max="35"
          required
        />
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CycleForm;
