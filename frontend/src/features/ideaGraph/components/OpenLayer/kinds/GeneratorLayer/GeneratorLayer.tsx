import { GraphConnector } from '@/components/molecules';
import { GoFurtherIdeaGenerator } from '@/components/organisms/GoFurtherIdeaGenerator/GoFurtherIdeaGenerator';
import {
  IdeaGenerator,
  type IdeaGeneratorState,
} from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import type {
  CollapsedData,
  GeneratorData,
  IdeasData,
} from '@/features/ideaGraph/store/state';
import { BulbForOpenLayer } from '@/shared/icons';
import type { FC } from 'react';

export type GeneratorLayerProps = {
  onGenerateIdea: (
    fromIdeaNumber: string,
    ideaGeneratorState: IdeaGeneratorState,
  ) => void;
  data: GeneratorData;
};

export const GeneratorLayer: FC<GeneratorLayerProps> = ({
  onGenerateIdea,
  data,
}) => {
  const {
    goToLayer,
    changeLayer,
    currentLayer: currentLayerId,
    layers,
  } = useIdeasGraph((state) => state);

  const createIdeaIcon = (ideaNumber: string) => {
    return (
      <div className="relative">
        <BulbForOpenLayer />
        <span
          className="absolute top-[40%] left-1/2 -translate-1/2 font-bold
            text-[#DBB345]"
        >
          {ideaNumber}
        </span>
      </div>
    );
  };

  const handleGoFurther = (
    layerId: number | undefined,
    fromIdeaNumber: string,
  ) => {
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
        [fromIdeaNumber]: {
          // @ts-expect-error lskdjflksjd
          ...updatedIdeas[fromIdeaNumber],
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
      {Object.entries(data).map(([ideaNumber, idea], index) => (
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
              items-center justify-center rounded-[13px] border-[3px]"
          >
            {createIdeaIcon(ideaNumber)}
          </div>
          <div
            className="border-t-brainstormySecondary w-[22px] border-t-[1px]
              border-dashed"
          />
          {idea.nextLayer ? (
            <GoFurtherIdeaGenerator
              onGoFurther={() => handleGoFurther(idea.nextLayer, ideaNumber)}
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
                onGenerateIdea(ideaNumber, ideaGeneratorState)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};
