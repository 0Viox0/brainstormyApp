export type Method = 'sixHats' | 'scamper';
export type LayerId = number;

export type Idea = {
  content: string;
  chosen?: boolean;
  nextLayer?: LayerId;
  nextMethod?: Method;
  nextPrompt?: string;
};

export type ScamperData = {
  s: Idea;
  c: Idea;
  a: Idea;
  m: Idea;
  p: Idea;
  e: Idea;
  r: Idea;
};

export type SixHatsData = {
  blue: Idea;
  white: Idea;
  green: Idea;
  yellow: Idea;
  black: Idea;
  red: Idea;
};

export type IdeasData = SixHatsData | ScamperData;

export type CollapsedData = {
  isCollapsed: boolean;
  chosenMethod: Method;
  chosenPrompt: string;
};

export type IdeasLayer = {
  id: LayerId;
  collapsedData: CollapsedData | null;
  baseIdea: string;
  helperPrompt: string;
  method: Method;
  ideas: IdeasData;
};

export type IdeaGraph = {
  isLoadingNewLayer: boolean;
  currentLayer: LayerId;
  layers: IdeasLayer[];
};
