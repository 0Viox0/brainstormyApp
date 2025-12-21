import type { Method } from '@/components/molecules/MethodPicker/MethodPicker';
import { type FC } from 'react';
import { ScamperLayer, SixHatsLayer } from './kinds';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { LayerLoader } from './LayerLoader/LayerLoader';
import type { ScamperData, SixHatsData } from '../../store/state';
import { useQuery } from '@tanstack/react-query';
import { fetchIdeas } from '../../data/fetch';
import { toLayerData } from '../../utils/mappers/layerResponseToData';

export type OpenLayerProps = {
  triggerGenerateNewLayer: (ideaGeneratorState: IdeaGeneratorState) => void;
  layerData: {
    method: Method;
    baseIdea: string;
    helpingPrompt: string;
    data?: LayerBackendData;
  };
};

type LayerBackendData = SixHatsData | ScamperData;

export const OpenLayer: FC<OpenLayerProps> = ({
  triggerGenerateNewLayer,
  layerData,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      'ideas',
      layerData.method,
      layerData.baseIdea,
      layerData.helpingPrompt,
    ],
    queryFn: async () => {
      const layerDataResponse = await fetchIdeas(
        layerData.method,
        layerData.baseIdea,
        layerData.helpingPrompt,
      );

      return toLayerData(layerDataResponse);
    },
  });

  const renderLayer = () => {
    const getIdeasCountToGenerate = () => {
      return layerData.method === 'sixHats' ? 6 : 7;
    };

    if (isLoading) {
      return (
        <LayerLoader
          mountPointAgainstIdeaNumber={2}
          ideasCount={getIdeasCountToGenerate()}
        />
      );
    }

    if (layerData.method === 'sixHats') {
      return (
        <SixHatsLayer
          onGenerateIdea={triggerGenerateNewLayer}
          data={data as SixHatsData}
        />
      );
    }

    if (layerData.method === 'scamper') {
      return (
        <ScamperLayer
          onGenerateIdea={triggerGenerateNewLayer}
          data={data as ScamperData}
        />
      );
    }
  };

  return (
    <div className="flex items-start">
      <div className="mt-[420px]"></div>
      <div className="ml-[100px]">{renderLayer()}</div>
    </div>
  );
};
