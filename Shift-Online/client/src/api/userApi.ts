import axios from 'axios';
import { User } from '../types/user';

const API_BASE = '/api/users';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_BASE, { withCredentials: true });
  return res.data;
};

export const createUser = async (user: Partial<User>) => {
  await axios.post(API_BASE, user, { withCredentials: true });
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
};
