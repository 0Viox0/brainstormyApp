import { create } from 'zustand';
import type { AppState } from './state';
import type { AppActions } from './actions';

export const useAppStore = create<AppState & AppActions>((set) => ({
  user: null,
  setUser: (user: AppState['user']) => set(() => ({ user })),
  substractTokens: (tokens: number) =>
    set((state) => {
      if (!state.user) {
        console.warn('cannot substract tokens from unauthorized user');
        return state;
      }

      const newTokens = Math.max(0, state.user.tokensLeft - tokens);

      return {
        ...state,
        user: {
          ...state.user,
          tokensLeft: newTokens,
        },
      };
    }),
}));
