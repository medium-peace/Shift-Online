import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ShiftForm from './components/ShiftForm'; // 既存

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <ShiftForm user={user} />
      )}
    </div>
  );
}

export default App;
