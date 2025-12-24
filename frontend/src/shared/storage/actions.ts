import type { User } from './state';

export type AppActions = {
  setUser: (user: User) => void;
};
