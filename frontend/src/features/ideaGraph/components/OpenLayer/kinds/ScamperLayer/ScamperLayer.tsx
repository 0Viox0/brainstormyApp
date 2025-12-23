import { GraphConnector } from '@/components/molecules';
import { GoFurtherIdeaGenerator } from '@/components/organisms/GoFurtherIdeaGenerator/GoFurtherIdeaGenerator';
import {
  IdeaGenerator,
  type IdeaGeneratorState,
} from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import type {
  CollapsedData,
  IdeasData,
  ScamperData,
} from '@/features/ideaGraph/store/state';
import type { FC } from 'react';

export type ScamperLayerProps = {
  onGenerateIdea: (
    fromLetter: string,
    ideaGeneratorState: IdeaGeneratorState,
  ) => void;
  data: ScamperData;
};

export const ScamperLayer: FC<ScamperLayerProps> = ({
  onGenerateIdea,
  data,
}) => {
  const {
    goToLayer,
    changeLayer,
    currentLayer: currentLayerId,
    layers,
  } = useIdeasGraph((state) => state);

  const handleGoFurther = (layerId: number | undefined, fromLetter: string) => {
    if (!layerId) return;

    const currentLayer = layers.find((layer) => layer.id === currentLayerId);
    const nextLayer = layers.find((layer) => layer.id === layerId);

    if (!currentLayer || !nextLayer) return;

    // reset chosen ideas
    const updatedIdeas = Object.fromEntries(
      Object.entries(currentLayer.ideas).map(([key, idea]) => [
        key,
        {
          ...idea,
          chosen: false,
        },
      ]),
    ) as IdeasData;

    // collapse current layer
    changeLayer(currentLayerId, {
      ...currentLayer,
      ideas: updatedIdeas,
      collapsedData: {
        ...currentLayer.collapsedData,
        isCollapsed: true,
      } as CollapsedData,
    });

    // set proper chosen idea
    changeLayer(currentLayerId, {
      ...currentLayer,
      ideas: {
        ...updatedIdeas,
        [fromLetter]: {
          // @ts-expect-error lskdjflksjd
          ...updatedIdeas[fromLetter],
          chosen: true,
        },
      },
      collapsedData: {
        ...currentLayer.collapsedData,
        isCollapsed: true,
      } as CollapsedData,
    });

    // uncollapse layer we are going to
    changeLayer(layerId, {
      ...nextLayer,
      collapsedData: {
        ...nextLayer.collapsedData,
        isCollapsed: false,
      } as CollapsedData,
    });

    // change layer
    goToLayer(layerId);
  };
  return (
    <div>
      {Object.entries(data).map(([letter, idea], index) => (
        <div
          className="relative mb-[58px] flex h-[129px] items-center"
          key={index}
        >
          <GraphConnector
            currentIndex={index}
            putMountPointInFrontOfNthGenerator={2}
            spaceBetweenIdeaGeneratorsPx={187}
          />
          <div
            className="border-brainstormySecondary flex aspect-square w-12
              items-center justify-center rounded-[13px] border-[3px] font-bold"
          >
            {letter.toUpperCase()}
          </div>
          <div
            className="border-t-brainstormySecondary w-[22px] border-t-[1px]
              border-dashed"
          />

          {idea.nextLayer ? (
            <GoFurtherIdeaGenerator
              onGoFurther={() => handleGoFurther(idea.nextLayer, letter)}
              ideaGeneratorState={{
                text: idea.content,
                method: idea.nextMethod || 'sixHats',
                prompt: idea.nextPrompt || '',
              }}
            />
          ) : (
            <IdeaGenerator
              text={idea.content}
              onGenerate={(ideaGeneratorState) =>
                onGenerateIdea(letter, ideaGeneratorState)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};
