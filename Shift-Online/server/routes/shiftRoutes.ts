import express from 'express';
import db from '../db/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// 全シフト取得（ログイン済みユーザーのみ）
router.get('/', authenticateToken, (req, res) => {
  const stmt = db.prepare('SELECT * FROM shifts');
  const shifts = stmt.all();
  res.json(shifts);
});

// シフト作成
router.post('/', authenticateToken, (req, res) => {
  const { userId, date, startTime, endTime } = req.body;
  const stmt = db.prepare('INSERT INTO shifts (userId, date, startTime, endTime) VALUES (?, ?, ?, ?)');
  const info = stmt.run(userId, date, startTime, endTime);
  res.status(201).json({ id: info.lastInsertRowid });
});

// 特定ユーザーのシフト取得
router.get('/:userId', authenticateToken, (req, res) => {
  const userId = req.params.userId;
  const stmt = db.prepare('SELECT * FROM shifts WHERE userId = ?');
  const shifts = stmt.all(userId);
  res.json(shifts);
});

// シフト更新
router.put('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const { date, startTime, endTime } = req.body;
  const stmt = db.prepare('UPDATE shifts SET date = ?, startTime = ?, endTime = ? WHERE id = ?');
  const info = stmt.run(date, startTime, endTime, id);
  res.json({ changes: info.changes });
});

// シフト削除
router.delete('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM shifts WHERE id = ?');
  const info = stmt.run(id);
  res.json({ deleted: info.changes });
});

export default router;
