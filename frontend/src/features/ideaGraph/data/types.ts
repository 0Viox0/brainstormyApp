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

export type GeneratorDataResponse = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
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

export type GeneratorResponse = {
  type: 'generator';
  data: GeneratorDataResponse;
  tokensUsed: number;
};

export type LayerDataResponse =
  | SixHatsResponse
  | ScamperResponse
  | GeneratorResponse;
