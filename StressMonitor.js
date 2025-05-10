
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const StressMonitor = () => {
  const [log, setLog] = useState([]);
  const [stressLevel, setStressLevel] = useState('');
  const [otherTechnique, setOtherTechnique] = useState('');
  const [name, setName] = useState('');
  const [commuteSchedule, setCommuteSchedule] = useState('');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    const storedLog = JSON.parse(localStorage.getItem(name)) || [];
    setLog(storedLog);
  }, [name]);

  const logStress = (performed) => {
    if (!name) return alert("Please enter your name.");
    const newLog = [...log, { date: selectedDate, timestamp: new Date().toLocaleString(), name, commuteSchedule, performed, stressLevel: parseInt(stressLevel), otherTechnique }];
    setLog(newLog);
    localStorage.setItem(name, JSON.stringify(newLog));
    setCommuteSchedule('');
    setStressLevel('');
    setOtherTechnique('');
  };

  const getColor = (level) => (level <= 3 ? '#4caf50' : level <= 6 ? '#ffeb3b' : '#f44336');

  const setCurrentTime = () => {
    const now = new Date();
    setCommuteSchedule(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-2xl font-bold text-center">Commuter Stress Monitoring</CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <Input type="text" placeholder="Commute Schedule (e.g., 6:00 AM)" value={commuteSchedule} onChange={(e) => setCommuteSchedule(e.target.value)} />
            <Button onClick={setCurrentTime}>Set Current Time</Button>
          </div>
          <Input type="number" placeholder="Stress Level (1-10)" value={stressLevel} onChange={(e) => setStressLevel(e.target.value)} />
          <Input type="text" placeholder="Other Technique (optional)" value={otherTechnique} onChange={(e) => setOtherTechnique(e.target.value)} />
          <div className="flex gap-4 mt-4">
            <Button onClick={() => logStress(true)}>4-7-8 Technique</Button>
            <Button onClick={() => logStress(false)}>Other Technique</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressMonitor;
