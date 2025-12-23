import type { IdeasLayer, LayerId, Method } from './state';

export type IdeaGraphAction = {
  goToLayer: (layerId: LayerId) => void;
  changeLayer: (layerId: LayerId, changedLayer: IdeasLayer) => void;
  addLayer: (newLayer: IdeasLayer) => void;

  loadNewLayer: () => void;
  finishLoadingNewLayer: () => void;

  resetChosenIdeas: (layerId: LayerId) => void;
  setNextLayerForIdea: (
    layerId: LayerId,
    ideaKey: string,
    nextLayerId: LayerId,
    nextMethod: Method,
    nextPrompt: string,
  ) => void;
};
