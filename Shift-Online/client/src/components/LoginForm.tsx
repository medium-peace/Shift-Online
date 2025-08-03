// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { login } from '../api/shiftApi';

type User = {
  id: number;
  name: string;
};

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
      onLogin(user); // ✅ App.tsx に渡された関数を呼ぶ
    } catch (err) {
      alert('ログインに失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
