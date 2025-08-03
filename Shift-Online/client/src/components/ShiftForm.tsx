// client/src/components/ShiftForm.tsx

import { useState } from 'react';
import { createShift } from '../api/shiftApi';

interface ShiftFormProps {
  user: { id: number; name: string };
}

export default function ShiftForm({ user }: ShiftFormProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createShift({
        userId: user.id,  // ← ここが重要
        date,
        startTime,
        endTime
      });
      setMessage('シフトを登録しました！');
    } catch (err) {
      setMessage('登録に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>シフト登録</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
      <button type="submit">登録</button>
      <p>{message}</p>
    </form>
  );
}
