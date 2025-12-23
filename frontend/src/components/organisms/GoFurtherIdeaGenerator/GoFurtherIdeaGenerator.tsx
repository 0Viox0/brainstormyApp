import { GoFurtherButton, IdeaTextHolder } from '@/components/atoms';
import { MainBlockConnector } from '@/shared/images';
import { cn } from '@/shared/utils';
import { type FC } from 'react';
import { ViewOnlyMethodPicker } from '../ViewOnlyIdeaGenerator/components/ViewOnlyMethodPicker';
import { ViewOnlyPromptPicker } from '../ViewOnlyIdeaGenerator/components/ViewOnlyPromptPicker';
import { WithTooltip } from '@/components/molecules';
import type { Method } from '@/features/ideaGraph/store/state';

type Prompt = string;
export type IdeaGeneratorState = {
  text: string;
  method: Method;
  prompt: Prompt;
};

export type IdeaGeneratorProps = {
  onGoFurther: () => void;
  ideaGeneratorState: IdeaGeneratorState;
};

export const GoFurtherIdeaGenerator: FC<IdeaGeneratorProps> = ({
  onGoFurther,
  ideaGeneratorState,
}) => {
  return (
    <div className="relative flex items-center">
      <div className="relative mr-[7px]">
        <IdeaTextHolder
          text={ideaGeneratorState.text}
          className="bg-opacity-60 bg-black text-gray-500"
        />
        <div className={cn('absolute top-[42%] left-[94%] space-y-4')}>
          <ViewOnlyMethodPicker
            method={ideaGeneratorState.method}
            className="opacity-[70%]"
          />
          <ViewOnlyPromptPicker
            isPromptEmpty={!ideaGeneratorState.prompt}
            className="opacity-[70%]"
          />
        </div>
      </div>
      <MainBlockConnector className="mr-[-4px]" />
      <WithTooltip
        tooltipText="пойти дальше"
        className="top-1/2 left-[130%] -translate-y-1/2 text-nowrap"
      >
        <GoFurtherButton onClick={onGoFurther} />
      </WithTooltip>
    </div>
  );
};
