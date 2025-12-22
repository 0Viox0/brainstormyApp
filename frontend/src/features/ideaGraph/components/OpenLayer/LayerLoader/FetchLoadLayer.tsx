import { useQuery } from '@tanstack/react-query';
import { LayerLoader } from './LayerLoader';
import type { IdeasLayer } from '@/features/ideaGraph/store/state';
import type { FC } from 'react';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import { fetchIdeas } from '@/features/ideaGraph/data/fetch';
import { toLayerData } from '@/features/ideaGraph/utils/mappers/layerResponseToData';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';

export type FetchLoadLayerProps = {
  ideaGeneratorState: IdeaGeneratorState;
};

export const FetchLoadLayer: FC<FetchLoadLayerProps> = ({
  ideaGeneratorState,
}) => {
  const { addLayer, finishLoadingNewLayer } = useIdeasGraph((state) => state);
  const { method, text: baseIdea, prompt: helpingPrompt } = ideaGeneratorState;

  useQuery({
    queryKey: ['ideas', method, baseIdea, helpingPrompt],
    queryFn: async () => {
      const layerDataResponse = await fetchIdeas(
        method,
        baseIdea,
        helpingPrompt,
      );

      const newIdeasLayer: IdeasLayer = {
        id: Date.now() + Math.random(),
        baseIdea: baseIdea,
        helperPrompt: helpingPrompt,
        isCollapsed: false,
        method: method,
        ideas: toLayerData(layerDataResponse),
      };

      addLayer(newIdeasLayer);
      finishLoadingNewLayer();

      return toLayerData(layerDataResponse);
    },
  });

  const getIdeasCountToGenerate = () => {
    return method === 'sixHats' ? 6 : 7;
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
