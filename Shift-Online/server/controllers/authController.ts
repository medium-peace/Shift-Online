import { Request, Response } from 'express';
import db from '../db/database';

type UserSession = {
  id: number;
  username: string;
  role: string;
};

export const login = (req: Request, res: Response) => {
  const { name, password } = req.body;

  const stmt = db.prepare('SELECT id, name AS username, role FROM users WHERE name = ? AND password = ?');
  const user = stmt.get(name, password) as UserSession | undefined;

  if (!user) {
    return res.status(401).json({ message: '認証失敗' });
  }

  req.session.user = {
    id: user.id,
    name: user.username,
    role: user.role,
  };

  res.json({
    id: user.id,
    name: user.username,
    role: user.role,
  });
};




export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
