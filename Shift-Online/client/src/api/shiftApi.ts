import { Shift } from '../types/shift'; // パスが正しいことを確認してください
import { User } from '../types/user'
const API_BASE = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL + '/api/shifts' : 'http://localhost:5000/api/shifts';

export async function login(name: string, password: string): Promise<User> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const data = await res.json();
  console.log("受信データ:", data);  // ← ここを追加
  return data;  // ✅ ここで { id, name, role } を含んでいるか？
}

export const fetchShifts = async () => {
  const res = await fetch(API_BASE, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return await res.json();
};

export const createShift = async (shift: Shift): Promise<void> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
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
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(update),
  });
  if (!res.ok) {
    throw new Error(`Failed to update: ${res.status}`);
  }
  return await res.json();
}

export async function deleteShift(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Failed to delete: ${res.status}`);
  }
  return await res.json();
}
