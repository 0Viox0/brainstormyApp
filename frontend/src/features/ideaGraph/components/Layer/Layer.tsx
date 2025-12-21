import { GenerateIdeaButton } from '@/components/atoms';
import type { Method } from '@/components/molecules/MethodPicker/MethodPicker';
import { useEffect, useState, type FC } from 'react';
import { ScamperLayer, SixHatsLayer } from './kinds';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import type { ScamperData, SixHatsData } from '../../types';
import { LayerLoader } from './LayerLoader/LayerLoader';

export type LayerProps = {
  triggerGenerateNewLayer: (ideaGeneratorState: IdeaGeneratorState) => void;
  layerData: {
    method: Method;
    baseIdea: string;
    helpingPrompt: string;
  };
};

type LayerBackendData = SixHatsData | ScamperData;

export const Layer: FC<LayerProps> = ({
  triggerGenerateNewLayer,
  layerData,
}) => {
  const [ideaData, setIdeaData] = useState<LayerBackendData | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch(
        `http://localhost:3000/ideas/${layerData.method}?baseIdea=${layerData.baseIdea}&prompt=${layerData.helpingPrompt}`,
      );

      const data = await response.json();

      setIdeaData(data.data);
    };

    fetchIdeas();
  }, [layerData]);

  const renderLayer = () => {
    const getIdeasCountToGenerate = () => {
      return layerData.method === 'sixHats' ? 6 : 7;
    };

    if (!ideaData) {
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
          data={ideaData as SixHatsData}
        />
      );
    }

    if (layerData.method === 'scamper') {
      return (
        <ScamperLayer
          onGenerateIdea={triggerGenerateNewLayer}
          data={ideaData as ScamperData}
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
