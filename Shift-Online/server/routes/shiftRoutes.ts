import { Router } from 'express';

const router = Router();

// 仮ルート
router.get('/', (_req, res) => {
  res.json({ message: 'Shift routes placeholder' });
});

export default router;
