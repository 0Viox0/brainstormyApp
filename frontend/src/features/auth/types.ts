import type { User } from '@/shared/storage/state';

export type AuthResponse = {
  user: User;
  jwtToken: string;
};
