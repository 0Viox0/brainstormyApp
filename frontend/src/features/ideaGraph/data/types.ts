export type ScamperDataResponse = {
  s: string;
  c: string;
  a: string;
  m: string;
  p: string;
  e: string;
  r: string;
};

export type SixHatsDataResponse = {
  blue: string;
  white: string;
  green: string;
  yellow: string;
  black: string;
  red: string;
};

export type ScamperResponse = {
  type: 'scamper';
  data: ScamperDataResponse;
  tokensUsed: number;
};

export type SixHatsResponse = {
  type: 'sixHats';
  data: SixHatsDataResponse;
  tokensUsed: number;
};

export type LayerDataResponse = SixHatsResponse | ScamperResponse;
