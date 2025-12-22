import { type FC } from 'react';
import { ScamperLayer, SixHatsLayer } from './kinds';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { useIdeasGraph } from '../../store';
import type { SixHatsKeys } from './kinds/SixHatsLayer/SixHatsLayer';
import type { IdeasData, ScamperData, SixHatsData } from '../../store/state';
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
        const nextLayerId = Date.now() + Math.random();

        console.log(fromHat, ideaGeneratorState);

        const updatedIdeas = Object.fromEntries(
          Object.entries(layer.ideas).map(([key, idea]) => [
            key,
            {
              ...idea,
              chosen: false,
            },
          ]),
        ) as IdeasData;

        changeLayer(layer.id, {
          ...layer,
          ideas: updatedIdeas,
        });

        changeLayer(layer.id, {
          ...layer,
          collapsedData: {
            chosenMethod: ideaGeneratorState.method,
            chosenPrompt: ideaGeneratorState.prompt,
            isCollapsed: true,
          },
          ideas: {
            ...updatedIdeas,
            [fromHat]: {
              ...updatedIdeas[fromHat],
              chosen: true,
              nextLayer: nextLayerId,
            },
          },
        });

        triggerGenerateNewLayer({
          ...ideaGeneratorState,
          layerId: nextLayerId,
        });
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
        const nextLayerId = Date.now() + Math.random();

        changeLayer(layer.id, {
          ...layer,
          method: 'scamper',
          collapsedData: {
            chosenMethod: ideaGeneratorState.method,
            chosenPrompt: ideaGeneratorState.prompt,
            isCollapsed: true,
          },
          ideas: {
            ...layer.ideas,
            [fromLetter]: {
              ...layer.ideas[fromLetter],
              chosen: true,
              nextLayer: nextLayerId,
            },
          },
        });

        triggerGenerateNewLayer({
          ...ideaGeneratorState,
          layerId: nextLayerId,
        });
      };

      return (
        <ScamperLayer
          onGenerateIdea={triggerGenerateNewLayerAndChange}
          data={layer.ideas as ScamperData}
        />
      );
    }
  };

  return (
    <div className="flex items-start">
      <div className="mt-[420px]">
        <GenerateIdeaButton
          onClick={() => {}}
          className="hover:scale-100 hover:cursor-default"
        />
      </div>
      <div className="ml-[100px]">{renderLayer()}</div>
    </div>
  );
};
