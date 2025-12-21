import { create } from 'zustand';
import type { IdeaGraphAction } from './actions';
import type { IdeaGraph, IdeasLayer, LayerId } from './state';

export const useIdeasGraph = create<IdeaGraph & IdeaGraphAction>((set) => ({
  currentLayer: -1,
  layers: [],
  goToLayer: (layerId: LayerId) => set(() => ({ currentLayer: layerId })),
  changeLayer: (layerId: LayerId, changedLayer: IdeasLayer) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, ...changedLayer } : layer,
      ),
    })),
  addLayer: (newLayer: IdeasLayer) =>
    set((state) => ({
      layers: [...state.layers, newLayer],
    })),
}));
