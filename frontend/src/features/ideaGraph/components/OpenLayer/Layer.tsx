import type { Method } from '@/components/molecules/MethodPicker/MethodPicker';
import { type FC } from 'react';
import { ScamperLayer, SixHatsLayer } from './kinds';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { LayerLoader } from './LayerLoader/LayerLoader';
import type { IdeasLayer, ScamperData, SixHatsData } from '../../store/state';
import { useQuery } from '@tanstack/react-query';
import { fetchIdeas } from '../../data/fetch';
import { toLayerData } from '../../utils/mappers/layerResponseToData';
import { useIdeasGraph } from '../../store';

export type OpenLayerProps = {
  triggerGenerateNewLayer: (ideaGeneratorState: IdeaGeneratorState) => void;
  layerId?: number;
  layerData: {
    method: Method;
    baseIdea: string;
    helpingPrompt: string;
  };
};

export const OpenLayer: FC<OpenLayerProps> = ({
  layerId,
  triggerGenerateNewLayer,
  layerData,
}) => {
  const { addLayer, changeLayer, finishLoadingNewLayer, layers } =
    useIdeasGraph((state) => state);

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

      const newIdeasLayer: IdeasLayer = {
        id: Date.now() + Math.random(),
        baseIdea: layerData.baseIdea,
        helperPrompt: layerData.helpingPrompt,
        isCollapsed: false,
        ...toLayerData(layerDataResponse),
      };

      addLayer(newIdeasLayer);
      finishLoadingNewLayer();

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
