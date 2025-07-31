import { Router } from 'express';

const router = Router();

// 仮ルート
router.get('/', (_req, res) => {
  res.json({ message: 'User routes placeholder' });
});

export default router;
