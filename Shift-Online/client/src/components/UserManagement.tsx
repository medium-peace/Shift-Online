import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser, deleteUser } from '../api/userApi';
import { User } from '../types/user';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('ユーザーの取得に失敗しました');
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser({ username: name, password, role });
      setName('');
      setPassword('');
      await loadUsers();
    } catch (err) {
      setError('ユーザーの作成に失敗しました');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      setError('ユーザーの削除に失敗しました');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>ユーザー管理</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ユーザー名" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" type="password" />
        <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'user')}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={handleCreateUser}>追加</button>
      </div>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} ({u.role})
            <button onClick={() => handleDeleteUser(u.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
