import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StressMonitor = () => {
  const [hasPerformed478, setHasPerformed478] = useState(false);
  const [log, setLog] = useState([]);
  const [stressLevel, setStressLevel] = useState('');
  const [otherTechnique, setOtherTechnique] = useState('');
  const [name, setName] = useState('');
  const [commuteSchedule, setCommuteSchedule] = useState('');

  const availableTimes = [
    "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM"
  ];

  useEffect(() => {
    const storedLog = JSON.parse(localStorage.getItem('stressLog')) || [];
    setLog(storedLog);
  }, []);

  const validateCustomTime = (time) => {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    return regex.test(time);
  };

  const handle478 = () => {
    setHasPerformed478(true);
    logStress(true);
  };

  const handleNo478 = () => {
    setHasPerformed478(false);
    logStress(false);
  };

  const logStress = (performed) => {
    if (commuteSchedule === "custom" && !validateCustomTime(commuteSchedule)) {
      alert("Please enter a valid custom schedule (e.g., 6:00 AM - 7:00 AM)");
      return;
    }
    const newLog = [
      ...log,
      { timestamp: new Date().toLocaleString(), name, commuteSchedule, performed, stressLevel: parseInt(stressLevel), otherTechnique }
    ];
    setLog(newLog);
    localStorage.setItem('stressLog', JSON.stringify(newLog));
    setName('');
    setCommuteSchedule('');
    setStressLevel('');
    setOtherTechnique('');
  };

  const getStressLabel = (level) => {
    const num = parseInt(level);
    if (num >= 7) return 'High';
    if (num >= 4) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-md w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-1">Commuter Stress Monitoring</h2>
        <p className="text-sm text-gray-500 mb-4">Track your stress levels and use of the 4-7-8 technique.</p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <select
          value={commuteSchedule}
          onChange={(e) => setCommuteSchedule(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="">Choose Your Commute Schedule</option>
          {availableTimes.map((time, i) => (
            <option key={i} value={time}>{time}</option>
          ))}
          <option value="custom">Custom</option>
        </select>

        {commuteSchedule === "custom" && (
          <input
            type="text"
            placeholder="Enter custom schedule"
            value={commuteSchedule}
            onChange={(e) => setCommuteSchedule(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        )}

        <input
          type="number"
          placeholder="Stress Level (1-10)"
          value={stressLevel}
          onChange={(e) => setStressLevel(e.target.value)}
          className="w-full p-2 mb-1 border rounded"
        />
        <p className="text-sm text-gray-600 mb-4">Stress Level: {getStressLabel(stressLevel)}</p>

        <input
          type="text"
          placeholder="Other technique (optional)"
          value={otherTechnique}
          onChange={(e) => setOtherTechnique(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex gap-4">
          <button onClick={handle478} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            I did the 4-7-8 technique
          </button>
          <button onClick={handleNo478} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            I did not do it
          </button>
        </div>
      </div>
    </div>
  );
};

export default StressMonitor;
