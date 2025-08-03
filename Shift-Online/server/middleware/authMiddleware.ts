import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  (req as any).user = req.session.user;
  next();
};

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user?.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
