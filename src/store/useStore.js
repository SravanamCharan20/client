import { create } from 'zustand';

export const useStore = create((set) => ({
  token: null,
  user: null,
  problems: [],
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setProblems: (problems) => set({ problems }),
  logout: () => set({ token: null, user: null }),
}));
