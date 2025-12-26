export type User = {
  username: string;
  userLogoUrl: string;
  tokensLeft: number;
};

export type AppState = {
  user: User | null;
};
