import { Request, Response } from 'express';
import db from '../db/database';
import { User } from '../models/User';


export const getAllUsers = (_req: Request, res: Response) => {
  const stmt = db.prepare('SELECT id, name AS username, password, role, contact FROM users');
  const users = stmt.all() as User[];
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const stmt = db.prepare('SELECT id, name AS username, password, role, contact FROM users WHERE id = ?');
  const user: User = stmt.get(req.params.id) as User;
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};


export const createUser = (req: Request, res: Response) => {
  const { username, password, role, contact } = req.body;

  const insert = db.prepare('INSERT INTO users (name, password, role, contact) VALUES (?, ?, ?, ?)');
  const result = insert.run(username, password, role, contact);
  
  const newUser: User = {
    id: result.lastInsertRowid as number,
    username,
    password,
    role,
    contact
  };
  
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, role, contact } = req.body;

  const stmt = db.prepare(`
    UPDATE users
    SET name = COALESCE(?, name),
        password = COALESCE(?, password),
        role = COALESCE(?, role),
        contact = COALESCE(?, contact)
    WHERE id = ?
  `);

  const result = stmt.run(username, password, role, contact, id);
  if (result.changes === 0) return res.status(404).json({ message: 'User not found' });

  const updatedUser = db.prepare('SELECT id, name AS username, password, role, contact FROM users WHERE id = ?').get(id);
  res.json(updatedUser);
};


export const deleteUser = (req: Request, res: Response) => {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const result = stmt.run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'User deleted' });
};
