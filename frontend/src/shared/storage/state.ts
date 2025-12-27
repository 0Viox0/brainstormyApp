export type User = {
  username: string;
  userLogoUrl: string;
  tokensLeft: number;
  accountProvider: string;
};

export type AppState = {
  user: User | null;
};
