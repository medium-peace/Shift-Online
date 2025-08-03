import React, { useState } from 'react';
import { login } from '../api/shiftApi';
import { User } from '../types/user'; // ✅ 共通のUser型を使う！

type Props = {
  onLogin: (user: User) => void;
};

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(name, password);
      console.log("ログイン成功:", user); // ← ✅ ここで role が出るか？
      onLogin(user); // ✅ 正しくUser型として受け渡す
    } catch (err) {
      alert('ログインに失敗しました');
    }
  };

 return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Shift Online</h1>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: 4 }}>ユーザー名</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="ユーザー名を入力"
          style={{ width: '100%', padding: 8, fontSize: 16 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="パスワードを入力"
          style={{ width: '100%', padding: 8, fontSize: 16 }}
        />
      </div>

     <button
        type="submit"
        style={{
        display: 'block',      // ボタンをブロック要素に
        margin: '0 auto',      // 左右のマージンを自動にして中央寄せ
        padding: 10,
        fontSize: 18,
        width: '100%'          // or 固定幅 (例: width: 200)
      }}
    >
      ログイン
    </button>
    </form>
  );
};

export default LoginForm;

