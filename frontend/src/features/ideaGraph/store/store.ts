import { create } from 'zustand';
import type { IdeaGraphAction } from './actions';
import type { IdeaGraph, IdeasData, IdeasLayer, LayerId } from './state';

export const useIdeasGraph = create<IdeaGraph & IdeaGraphAction>((set) => ({
  isError: false,
  isLoadingNewLayer: false,
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

  loadNewLayer: () => set(() => ({ isLoadingNewLayer: true })),

  setIsError: (isError: boolean) => set(() => ({ isError })),

  finishLoadingNewLayer: () => set(() => ({ isLoadingNewLayer: false })),

  resetChosenIdeas: (layerId) =>
    set((state) => ({
      layers: state.layers.map((layer) => {
        if (layer.id !== layerId) return layer;

        const updatedIdeas = Object.fromEntries(
          Object.entries(layer.ideas).map(([key, idea]) => [
            key,
            {
              ...idea,
              chosen: false,
            },
          ]),
        ) as IdeasData;

        return {
          ...layer,
          ideas: updatedIdeas,
        };
      }),
    })),

  setNextLayerForIdea: (
    layerId,
    ideaKey,
    nextLayerId,
    nextMethod,
    nextPrompt,
  ) =>
    set((state) => ({
      layers: state.layers.map((layer) => {
        if (layer.id !== layerId) return layer;

        const updatedIdeas = Object.fromEntries(
          Object.entries(layer.ideas).map(([key, idea]) => [
            key,
            { ...idea, chosen: false },
          ]),
        ) as IdeasData;

        return {
          ...layer,
          collapsedData: {
            chosenMethod: nextMethod,
            chosenPrompt: nextPrompt,
            isCollapsed: true,
          },
          ideas: {
            ...updatedIdeas,
            [ideaKey]: {
              // @ts-expect-error everything is fine here
              ...updatedIdeas[ideaKey],
              chosen: true,
              nextLayer: nextLayerId,
              nextMethod,
              nextPrompt,
            },
          },
        };
      }),
    })),
}));
