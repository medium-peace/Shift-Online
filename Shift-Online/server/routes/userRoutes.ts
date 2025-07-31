import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

// 全ルートに「認証」ミドルウェア
router.use(authenticate);

// 一般メンバーでも閲覧できるAPI（必要に応じて制限）
router.get('/', requireRole('admin'), getAllUsers);
router.get('/:id', requireRole('admin'), getUserById);

// 管理者のみ変更可能
router.post('/', requireRole('admin'), createUser);
router.put('/:id', requireRole('admin'), updateUser);
router.delete('/:id', requireRole('admin'), deleteUser);

export default router;

