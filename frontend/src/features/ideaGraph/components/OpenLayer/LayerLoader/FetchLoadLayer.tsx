import { useQuery } from '@tanstack/react-query';
import { LayerLoader } from './LayerLoader';
import type { IdeasLayer, Method } from '@/features/ideaGraph/store/state';
import { useEffect, type FC } from 'react';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import { fetchIdeas } from '@/features/ideaGraph/data/fetch';
import { toLayerData } from '@/features/ideaGraph/utils/mappers/layerResponseToData';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { historyManger } from '@/features/ideaGraph/sevices/contextSaver';
import { tokenCounter } from '@/features/ideaGraph/sevices/tokensCounter';
import { useAppStore } from '@/shared/storage/store';

export type FetchLoadLayerProps = {
  ideaGeneratorState: IdeaGeneratorState;
  onMount: () => void;
};

export const FetchLoadLayer: FC<FetchLoadLayerProps> = ({
  ideaGeneratorState,
  onMount,
}) => {
  const { setIsError, addLayer, finishLoadingNewLayer, goToLayer } =
    useIdeasGraph((state) => state);
  const substractTokens = useAppStore((state) => state.substractTokens);
  const { method, text: baseIdea, prompt: helpingPrompt } = ideaGeneratorState;

  useEffect(() => {
    onMount();
  }, [onMount]);

  useQuery({
    queryKey: ['ideas', method, baseIdea, helpingPrompt],
    queryFn: async () => {
      const layerDataResponse = await fetchIdeas(
        method,
        baseIdea,
        helpingPrompt,
        historyManger.getHistory(),
      );

      if (!layerDataResponse) {
        finishLoadingNewLayer();
        setIsError(true);

        setTimeout(() => setIsError(false), 2500);
        return;
      }

      const newIdeasLayer: IdeasLayer = {
        id: ideaGeneratorState.layerId || Date.now() + Math.random(),
        baseIdea: baseIdea,
        helperPrompt: helpingPrompt,
        collapsedData: null,
        method: method,
        ideas: toLayerData(layerDataResponse),
      };

      tokenCounter.addTokens(layerDataResponse.tokensUsed);
      addLayer(newIdeasLayer);
      goToLayer(newIdeasLayer.id);
      finishLoadingNewLayer();
      substractTokens(layerDataResponse.tokensUsed);

      return toLayerData(layerDataResponse);
    },
  });

  const getIdeasCountToGenerate = () => {
    const methodIdeasCountMap: Record<Method, number> = {
      sixHats: 6,
      scamper: 7,
      generator: 9,
    };

    return methodIdeasCountMap[method as keyof typeof methodIdeasCountMap];
  };

  return (
    <div className="flex items-start">
      <div className="mt-[420px]"></div>
      <div className="ml-[100px]">
        <LayerLoader
          ideasCount={getIdeasCountToGenerate()}
          mountPointAgainstIdeaNumber={2}
        />
      </div>
    </div>
  );
};
