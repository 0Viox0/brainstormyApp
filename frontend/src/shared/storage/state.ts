export type User = {
  username: string;
  userLogoUrl: string;
  tokensLeft: number;
  accountProvider: string;
  isNew: boolean;
};

export type AppState = {
  user: User | null;
};
