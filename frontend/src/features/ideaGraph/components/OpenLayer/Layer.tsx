import { type FC } from 'react';
import { ScamperLayer, SixHatsLayer } from './kinds';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { useIdeasGraph } from '../../store';
import type { SixHatsKeys } from './kinds/SixHatsLayer/SixHatsLayer';
import type { SixHatsData } from '../../store/state';
import { GenerateIdeaButton } from '@/components/atoms';

export type OpenLayerProps = {
  triggerGenerateNewLayer: (ideaGeneratorState: IdeaGeneratorState) => void;
  layerId: number;
};

export const OpenLayer: FC<OpenLayerProps> = ({
  layerId,
  triggerGenerateNewLayer,
}) => {
  const { changeLayer, layers } = useIdeasGraph((state) => state);
  const layer = layers.find((layer) => layer.id === layerId);

  if (!layer) return <></>;

  const renderLayer = () => {
    if (layer.method === 'sixHats') {
      const triggerGenerateNewLayerAndDoChange = (
        fromHat: SixHatsKeys,
        ideaGeneratorState: IdeaGeneratorState,
      ) => {
        changeLayer(layer.id, {
          ...layer,
          collapsedData: {
            chosenMethod: ideaGeneratorState.method,
            chosenPrompt: ideaGeneratorState.prompt,
          },
          ideas: {
            ...layer.ideas,
            [fromHat]: {
              ...layer.ideas[fromHat],
              chosen: true,
            },
          },
        });

        triggerGenerateNewLayer(ideaGeneratorState);
      };

      return (
        <SixHatsLayer
          onGenerateIdea={triggerGenerateNewLayerAndDoChange}
          data={layer.ideas as SixHatsData}
        />
      );
    }

    if (layer.method === 'scamper') {
      const triggerGenerateNewLayerAndChange = (
        fromLetter: string,
        ideaGeneratorState: IdeaGeneratorState,
      ) => {
        changeLayer(layer.id, {
          ...layer,
          method: 'scamper',
          collapsedData: {
            chosenMethod: ideaGeneratorState.method,
            chosenPrompt: ideaGeneratorState.prompt,
          },
          ideas: {
            ...layer.ideas,
            [fromLetter]: {
              ...layer.ideas[fromLetter],
              chosen: true,
            },
          },
        });

        triggerGenerateNewLayer(ideaGeneratorState);
      };

      return (
        <ScamperLayer
          onGenerateIdea={triggerGenerateNewLayerAndChange}
          data={layer.ideas}
        />
      );
    }
  };

  return (
    <div className="flex items-start">
      <div className="mt-[420px]">
        <GenerateIdeaButton onClick={() => {}} />
      </div>
      <div className="ml-[100px]">{renderLayer()}</div>
    </div>
  );
};
