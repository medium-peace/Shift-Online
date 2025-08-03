// src/api/shiftApi.ts
const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function login(name: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
        credentials: 'include',
    });


  if (!res.ok) {
    throw new Error('ログイン失敗');
  }

  // 👇ユーザー情報を返す
  return res.json();
}

export async function fetchShifts() {
  const res = await fetch(`${API_URL}`, { credentials: 'include' });
  return res.json();
}

export async function createShift(shift: { userId: number; date: string; startTime: string; endTime: string }) {
  const res = await fetch('http://localhost:5000/api/shifts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ←★ココが超重要
    body: JSON.stringify(shift),
  });

  if (!res.ok) {
    throw new Error('シフト登録に失敗しました');
  }

  return res.json();
}

export async function updateShift(id: number, update: {
  date: string;
  startTime: string;
  endTime: string;
}) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(update),
  });
  return res.json();
}

export async function deleteShift(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}
