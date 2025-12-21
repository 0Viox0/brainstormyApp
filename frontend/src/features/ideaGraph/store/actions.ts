import type { IdeasLayer, LayerId } from './state';

export type IdeaGraphAction = {
  goToLayer: (layerId: LayerId) => void;
  changeLayer: (layerId: LayerId, changedLayer: IdeasLayer) => void;
  addLayer: (newLayer: IdeasLayer) => void;
};
