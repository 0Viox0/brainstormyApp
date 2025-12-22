import { GraphConnector } from '@/components/molecules';
import { IdeaGenerator } from '@/components/organisms/IdeaGenerator';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import type { SixHatsData } from '@/features/ideaGraph/store/state';
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
          <IdeaGenerator
            text={idea.content}
            onGenerate={(ideaGeneratorState) =>
              onGenerateIdea(hatColor as SixHatsKeys, ideaGeneratorState)
            }
          />
        </div>
      ))}
    </div>
  );
};
