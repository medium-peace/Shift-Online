import express from 'express';
import db from '../db/database';
import { User } from '../types/user'; // パスは適宜修正
import { authenticate } from '../middleware/authMiddleware';
import { Shift } from '../types/shift'; // パスは適宜調整

const router = express.Router();

// GET /api/shifts
router.get('/', async (req, res) => {
  const user = req.session.user as unknown as User;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
   let shifts;
  // 例: SQLiteで結合クエリ
if (user.role === 'admin') {
  // 管理者はすべて取得（JOINでuser名も取得）
  shifts = await db.prepare(`
    SELECT shifts.*, users.name AS userName
    FROM shifts
    JOIN users ON shifts.userId = users.id
  `).all();
} else {
  // メンバーは自分の分だけ
  shifts = await db.prepare(`
    SELECT shifts.*, users.name AS userName
    FROM shifts
    JOIN users ON shifts.userId = users.id
    WHERE shifts.userId = ?
  `).all(user.id);
}




    res.json(shifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// シフト作成（JWTから userId を取得）
router.post('/', authenticate, (req, res) => {
  const { date, startTime, endTime } = req.body;
  const userId = req.user!.id;

  const stmt = db.prepare(
    'INSERT INTO shifts (userId, date, startTime, endTime) VALUES (?, ?, ?, ?)'
  );
  const info = stmt.run(userId, date, startTime, endTime);
  res.status(201).json({ id: info.lastInsertRowid });
});

// シフト更新（本人のシフトか確認）
router.put('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const { date, startTime, endTime } = req.body;
  const userId = req.user!.id;

  const shift = db.prepare('SELECT * FROM shifts WHERE id = ?').get(id) as Shift;
  if (!shift) return res.status(404).json({ message: 'Shift not found' });
  if (shift.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

  const stmt = db.prepare(
    'UPDATE shifts SET date = ?, startTime = ?, endTime = ? WHERE id = ?'
  );
  const info = stmt.run(date, startTime, endTime, id);
  res.json({ changes: info.changes });
});

// シフト削除（本人のシフトか確認）
router.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const userId = req.user!.id;

  const shift = db.prepare('SELECT * FROM shifts WHERE id = ?').get(id) as Shift;
  if (!shift) return res.status(404).json({ message: 'Shift not found' });
  if (shift.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

  const stmt = db.prepare('DELETE FROM shifts WHERE id = ?');
  const info = stmt.run(id);
  res.json({ deleted: info.changes });
});

export default router;
