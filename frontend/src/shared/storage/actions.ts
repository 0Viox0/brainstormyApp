import type { AppState } from './state';

export type AppActions = {
  setUser: (user: AppState['user']) => void;
};
