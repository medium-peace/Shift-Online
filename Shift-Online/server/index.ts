import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import shiftRoutes from './routes/shiftRoutes';
import session from 'express-session';
import SQLiteStoreFactory from 'connect-sqlite3'

const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors({
  origin: 'http://localhost:3000', // フロントエンドのURL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // httpsでないならfalse
}));


// ルート
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shifts', shiftRoutes);

// 404ハンドラ
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// サーバ起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
