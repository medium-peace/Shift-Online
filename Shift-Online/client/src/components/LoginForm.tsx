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
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;

