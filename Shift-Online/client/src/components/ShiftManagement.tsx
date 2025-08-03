import React, { useEffect, useState } from 'react';
import { fetchShifts, updateShift, deleteShift } from '../api/shiftApi';
import { Shift } from '../types/shift';
import { User } from '../types/user';

type Props = {
  user: User;
};

const ShiftManagement: React.FC<Props> = ({ user }) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 編集用フォームの状態
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    loadShifts();
  }, []);

  const loadShifts = async () => {
    try {
      const data = await fetchShifts();
      setShifts(data);
      setError(null);
    } catch {
      setError('シフトの取得に失敗しました');
    }
  };

  // 編集ボタン押下時
  const startEdit = (shift: Shift) => {
    setEditingShift(shift);
    setDate(shift.date);
    setStartTime(shift.startTime);
    setEndTime(shift.endTime);
  };

  // 更新確定ボタン押下時
const handleUpdate = async () => {
  if (!editingShift || editingShift.id === undefined) {
    alert("編集対象のシフトが選択されていません");
    return;
  }

  await updateShift(editingShift.id, { date, startTime, endTime });
  await loadShifts();
  setEditingShift(null);
};

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingShift(null);
  };

  // 削除ボタン押下時
  const handleDelete = async (id: number) => {
    try {
      await deleteShift(id);
      await loadShifts();
      setError(null);
    } catch {
      setError('シフトの削除に失敗しました');
    }
  };

return (
  <div>
    <h2>シフト管理</h2>
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {editingShift ? (
      <div>
        <h3>シフト編集</h3>
        <label>
          日付: <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <br />
        <label>
          開始時間: <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
        </label>
        <br />
        <label>
          終了時間: <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
        </label>
        <br />
        <button onClick={handleUpdate}>更新</button>
        <button onClick={cancelEdit}>キャンセル</button>
      </div>
    ) : (
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            {/* 管理者ならユーザー名も表示 */}
            {user.role === 'admin' && <>{shift.userName} - </>}
            {shift.date} {shift.startTime}〜{shift.endTime}{' '}
            <button onClick={() => startEdit(shift)}>編集</button>
            <button onClick={() => handleDelete(shift.id)}>削除</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);}

export default ShiftManagement;
