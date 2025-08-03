import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ShiftForm from './components/ShiftForm';
import ShiftList from './components/ShiftList';
import UserManagement from './components/UserManagement';
import ShiftManagement from './components/ShiftManagement';  // 追加

function App() {
  const [user, setUser] = useState<any>(null);

  console.log("ログイン中のユーザー：", user);

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <>
          {/* 既存のシフトフォームとリスト */}
          <ShiftForm user={user} />
          <ShiftList user={user} />

          {/* 新しく追加：シフト編集・削除機能 */}
          <ShiftManagement user={user}/>

          {/* 管理者だけに表示されるユーザー管理 */}
          {user.role === 'admin' && <UserManagement />}
        </>
      )}
    </div>
  );
}

export default App;

