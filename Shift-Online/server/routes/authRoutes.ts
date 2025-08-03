import express from 'express';
import db from '../db/database';

const router = express.Router();

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = db
    .prepare('SELECT * FROM users WHERE name = ? AND password = ?')
    .get(name, password) as { id: number; name: string; password: string } | undefined;

  if (user) {
    req.session.user = { id: user.id, name: user.name };
    res.status(200).json({ id: user.id, name: user.name });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
});

export default router;
