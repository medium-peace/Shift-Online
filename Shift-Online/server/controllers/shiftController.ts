import { Request, Response } from 'express';
import db from '../db/database';

export const updateShift = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { userId, date, startTime, endTime } = req.body;

  const stmt = db.prepare(`
    UPDATE shifts
    SET userId = COALESCE(?, userId),
        date = COALESCE(?, date),
        startTime = COALESCE(?, startTime),
        endTime = COALESCE(?, endTime)
    WHERE id = ?
  `);

  const result = stmt.run(userId, date, startTime, endTime, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Shift not found' });
  }

  const updatedShift = db.prepare('SELECT * FROM shifts WHERE id = ?').get(id);
  res.json(updatedShift);
};
