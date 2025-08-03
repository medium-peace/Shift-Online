import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name?: string;
        role?: string;
        // JWTで入れているユーザー情報に合わせて必要な型を追加
      }
    }
  }
}
