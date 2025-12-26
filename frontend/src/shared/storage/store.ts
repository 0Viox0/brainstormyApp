import { create } from 'zustand';
import type { AppState } from './state';
import type { AppActions } from './actions';

export const useAppStore = create<AppState & AppActions>((set) => ({
  user: null,
  setUser: (user: AppState['user']) => set(() => ({ user })),
}));
