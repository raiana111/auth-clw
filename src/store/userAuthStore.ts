import { create } from 'zustand';
import {IUser} from '../types.ts';

interface UserState  {
  user: IUser | null
  setUser: (user: IUser) => void
  clearUser: () => void
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user })
  },
  clearUser: () => {
    localStorage.removeItem('user');
    set({ user: null })
  },
}));
