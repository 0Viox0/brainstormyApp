import { create } from 'zustand';
import type { AppState, User } from './state';
import type { AppActions } from './actions';

export const useAppStore = create<AppState & AppActions>((set) => ({
  user: {
    username: '',
    userLogoUrl: '',
    tokensLeft: 0,
  },
  setUser: (user: User) => set(() => ({ user })),
}));
