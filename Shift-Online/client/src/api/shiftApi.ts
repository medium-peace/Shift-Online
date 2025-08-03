import { Shift } from '../types/shift'; // パスが正しいことを確認してください
const API_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (name: string, password: string) => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ← これを追加！
    body: JSON.stringify({ name, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};

export async function fetchShifts() {
  const res = await fetch(`${API_URL}`, { credentials: 'include' });
  return res.json();
}

export const createShift = async (shift: Shift): Promise<void> => {
  const res = await fetch('http://localhost:5000/api/shifts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ✅ セッションを含める
    body: JSON.stringify(shift),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
};

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
