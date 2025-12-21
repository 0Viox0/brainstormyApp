export type ScamperResponse = {
  type: 'scamper';
  data: {
    s: string;
    c: string;
    a: string;
    m: string;
    p: string;
    e: string;
    r: string;
  };
};

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
};

export type LayerDataResponse = SixHatsResponse | ScamperResponse;
