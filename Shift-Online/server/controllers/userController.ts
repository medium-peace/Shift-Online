import { Request, Response } from 'express';
import { User } from '../models/User';

let users: User[] = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin', contact: 'admin@example.com' },
  { id: 2, username: 'user1', password: 'userpass', role: 'member', contact: 'user1@example.com' }
];

export const getAllUsers = (_req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { username, password, role, contact } = req.body;
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser: User = { id, username, password, role, contact };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, role, contact } = req.body;
  const user = users.find(u => u.id === Number(id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.username = username ?? user.username;
  user.password = password ?? user.password;
  user.role = role ?? user.role;
  user.contact = contact ?? user.contact;

  res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'User deleted' });
};
