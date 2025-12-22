export type SixHatsResponse = {
  type: 'sixHats';
  data: {
    blue: string;
    white: string;
    green: string;
    yellow: string;
    black: string;
    red: string;
  };
  tokensUsed: number;
};
