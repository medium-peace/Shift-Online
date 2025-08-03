import { Request, Response } from 'express';
import db from '../db/database';

type DBUser = {
  id: number;
  name: string;
  role: 'admin' | 'user';
};

export const login = (req: Request, res: Response) => {
  console.log("🔐 login 関数が呼ばれました");

  const { name, password } = req.body;

  const stmt = db.prepare('SELECT id, name, role FROM users WHERE name = ? AND password = ?');
  const user = stmt.get(name, password) as DBUser | undefined;

  console.log("SQLで取得したユーザー：", JSON.stringify(user));

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      role: user.role ?? 'user',
    });
  } else {
    res.status(401).json({ message: '認証失敗' });
  }
};


export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
