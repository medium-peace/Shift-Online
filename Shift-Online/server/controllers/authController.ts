import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'user1', password: 'userpass', role: 'member' },
];

const JWT_SECRET = process.env.JWT_SECRET!;

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });
  res.json({ message: 'Login successful', role: user.role });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};