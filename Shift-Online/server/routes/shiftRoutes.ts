import express from 'express';
import db from '../db/database';
import { authenticate } from '../middleware/authMiddleware';
import { Shift } from '../types/shift'; // パスは適宜調整

const router = express.Router();

// 全シフト取得（※必要でなければ管理者限定にするべき）
router.get('/', authenticate, (req, res) => {
  const shifts = db.prepare('SELECT * FROM shifts').all();
  res.json(shifts);
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

// ログインユーザーのシフト取得（他人のは取得不可）
router.get('/my', authenticate, (req, res) => {
  const userId = (req as any).user.id;
  const stmt = db.prepare('SELECT * FROM shifts WHERE userId = ?');
  const shifts = stmt.all(userId);
  res.json(shifts);
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
