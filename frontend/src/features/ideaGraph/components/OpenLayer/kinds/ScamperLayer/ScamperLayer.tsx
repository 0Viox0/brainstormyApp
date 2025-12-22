import { GraphConnector } from '@/components/molecules';
import {
  IdeaGenerator,
  type IdeaGeneratorState,
} from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import type { ScamperData } from '@/features/ideaGraph/store/state';
import type { FC } from 'react';

export type ScamperLayerProps = {
  onGenerateIdea: (
    fromLetter: string,
    ideaGeneratorState: IdeaGeneratorState,
  ) => void;
  data: ScamperData['data'];
};

export const ScamperLayer: FC<ScamperLayerProps> = ({
  onGenerateIdea,
  data,
}) => {
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
          <IdeaGenerator
            text={idea.content}
            onGenerate={(ideaGeneratorState) =>
              onGenerateIdea(letter, ideaGeneratorState)
            }
          />
        </div>
      ))}
    </div>
  );
};
