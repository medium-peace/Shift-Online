// src/components/ShiftList.tsx
import { useEffect, useState } from 'react';
import { fetchShifts, deleteShift } from '../api/shiftApi';

interface Shift {
  id: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
}

export default function ShiftList() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    fetchShifts().then(setShifts);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteShift(id);
    setShifts(shifts.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h2>シフト一覧</h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.date} {shift.startTime}-{shift.endTime}
            <button onClick={() => handleDelete(shift.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
