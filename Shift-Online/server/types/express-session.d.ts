import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      name: string;
      role: string;  // 必要に応じて型調整
    };
  }
}
