export type Method = 'sixHats' | 'scamper';
export type LayerId = number;

export type Idea = {
  content: string;
  chosen?: boolean;
  nextLayer?: LayerId;
};

export type ScamperData = {
  method: 'scamper';
  data: {
    s: Idea;
    c: Idea;
    a: Idea;
    m: Idea;
    p: Idea;
    e: Idea;
    r: Idea;
  };
};

export type SixHatsData = {
  method: 'sixHats';
  data: {
    blue: Idea;
    white: Idea;
    green: Idea;
    yellow: Idea;
    black: Idea;
    red: Idea;
  };
};

export type IdeasData = SixHatsData | ScamperData;

export type IdeasLayer = {
  id: LayerId;
  isCollapsed: boolean;
  baseIdea: string;
  helperPrompt: string;
} & IdeasData;

export type IdeaGraph = {
  currentLayer: LayerId;
  layers: IdeasLayer[];
};
