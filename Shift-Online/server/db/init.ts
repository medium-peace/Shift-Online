import Database from 'better-sqlite3';

const db = new Database('shift-online.db');

// テーブル作成
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    contact TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS shifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    date TEXT NOT NULL,
    startTime TEXT NOT NULL,
    endTime TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

// ユーザー挿入（roleを含める）
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, password, role)
  VALUES (?, ?, ?)
`);

// 管理者ユーザーを作成
insertUser.run('admin', 'adminpass', 'admin');

// テストユーザーを作成
insertUser.run('testuser', 'password123', 'user');

console.log('Tables initialized.');

