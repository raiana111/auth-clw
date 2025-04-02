import { create } from 'zustand';
import {IUser} from '../types.ts';

interface UserState  {
  user: IUser | null
  setUser: (user: IUser) => void
  clearUser: () => void
}

const getInitialData = (): IUser | null => {
  const savedState = localStorage.getItem('user');
  return savedState ? JSON.parse(savedState) : null;
};

export const useAuthStore = create<UserState>((set) => ({
  user: getInitialData(),
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user })
  },
  clearUser: () => {
    localStorage.removeItem('user');
    set({ user: null })
  },
}));
