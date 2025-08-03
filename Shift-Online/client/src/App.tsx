import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ShiftForm from './components/ShiftForm';
import ShiftList from './components/ShiftList';
import UserManagement from './components/UserManagement';

function App() {
  const [user, setUser] = useState<any>(null);

  // 🔍 ここでログ出力（毎回レンダリング時に表示されます）
  console.log("ログイン中のユーザー：", user);

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <>
          <ShiftForm user={user} />
          <ShiftList user={user} />
          {/* 🔒 管理者だけに表示される管理画面 */}
          {user.role === 'admin' && <UserManagement />}
        </>
      )}
    </div>
  );
}

export default App;
