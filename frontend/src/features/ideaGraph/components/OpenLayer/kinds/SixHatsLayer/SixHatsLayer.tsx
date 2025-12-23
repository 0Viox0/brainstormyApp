import { GraphConnector } from '@/components/molecules';
import { GoFurtherIdeaGenerator } from '@/components/organisms/GoFurtherIdeaGenerator/GoFurtherIdeaGenerator';
import { IdeaGenerator } from '@/components/organisms/IdeaGenerator';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import type {
  CollapsedData,
  IdeasData,
  SixHatsData,
} from '@/features/ideaGraph/store/state';
import { SixHatsLogo } from '@/shared/icons';
import type { FC } from 'react';

export type SixHatsProps = {
  onGenerateIdea: (
    fromHat: SixHatsKeys,
    ideaGeneratorState: IdeaGeneratorState,
  ) => void;
  data: SixHatsData;
};

export type SixHatsKeys = keyof SixHatsData;

export const SixHatsLayer: FC<SixHatsProps> = ({ data, onGenerateIdea }) => {
  const {
    goToLayer,
    changeLayer,
    currentLayer: currentLayerId,
    layers,
  } = useIdeasGraph((state) => state);

  const createHatIcon = (hatColor: SixHatsKeys) => {
    const hatsColorMap: Record<SixHatsKeys, string> = {
      blue: '#4f62ae',
      white: '#fff',
      green: '#48b86a',
      yellow: '#e2e665',
      black: '#000',
      red: '#c73939',
    };

    return <SixHatsLogo color={hatsColorMap[hatColor]} />;
  };

  const handleGoFurther = (layerId: number | undefined, fromHat: string) => {
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
        [fromHat]: {
          // @ts-expect-error lskdjflksjd
          ...updatedIdeas[fromHat],
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
      {Object.entries(data).map(([hatColor, idea], index) => (
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
            {createHatIcon(hatColor as SixHatsKeys)}
          </div>
          <div
            className="border-t-brainstormySecondary w-[22px] border-t-[1px]
              border-dashed"
          />
          {idea.nextLayer ? (
            <GoFurtherIdeaGenerator
              onGoFurther={() => handleGoFurther(idea.nextLayer, hatColor)}
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
                onGenerateIdea(hatColor as SixHatsKeys, ideaGeneratorState)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};
