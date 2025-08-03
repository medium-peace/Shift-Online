import React, { useEffect, useState } from 'react';
import { fetchShifts } from '../api/shiftApi';
import { Shift } from '../types/shift';
import { User } from '../types/user';

interface Props {
  user: User;
}

const ShiftList: React.FC<Props> = ({ user }) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShifts = async () => {
      try {
        const data = await fetchShifts(); // ユーザーごとの判定はサーバーが行うので、特にuser.idを渡す必要はない
        setShifts(data);
      } catch (err) {
        setError('シフトの取得に失敗しました');
        console.error(err);
      }
    };
    loadShifts();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>登録済みシフト一覧</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {shifts.map((shift) => (
          <li key={shift.id}>
            {shift.date} | {shift.startTime} - {shift.endTime}
            {user.role === 'admin' && ` (登録者: ${shift.userName})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftList;

