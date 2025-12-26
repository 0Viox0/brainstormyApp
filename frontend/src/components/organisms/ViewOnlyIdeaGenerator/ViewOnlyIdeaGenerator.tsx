import {
  IdeaTextHolder,
  ModalContainer,
  ViewOnlyEnterTextInput,
} from '@/components/atoms';
import { MainBlockConnector } from '@/shared/images';
import { cn } from '@/shared/utils';
import { useState, type FC } from 'react';
import { ViewOnlyMethodPicker } from './components/ViewOnlyMethodPicker';
import { ViewOnlyPromptPicker } from './components/ViewOnlyPromptPicker';
import type { Method } from '@/features/ideaGraph/store/state';

type Prompt = string;
export type IdeaGeneratorState = {
  text: string;
  method: Method;
  prompt: Prompt;
};

export type IdeaGeneratorProps = {
  isFirstIdea?: boolean;
  ideaGeneratorState: IdeaGeneratorState;
};

export const ViewOnlyIdeaGenerator: FC<IdeaGeneratorProps> = ({
  isFirstIdea,
  ideaGeneratorState,
}) => {
  const [displayPrompt, setDisplayPrompt] = useState(false);

  const handleDisplayTextWindow = () => setDisplayPrompt(true);
  const handleCloseTextWindow = () => setDisplayPrompt(false);

  return (
    <div className="relative flex items-center">
      <div className="relative mr-[7px]">
        <IdeaTextHolder text={ideaGeneratorState.text} />
        <div
          className={cn('absolute top-[42%] left-[94%] space-y-4', {
            'top-[62%]': isFirstIdea,
          })}
        >
          <ViewOnlyMethodPicker method={ideaGeneratorState.method} />
          {!isFirstIdea && (
            <ViewOnlyPromptPicker
              isPromptEmpty={!ideaGeneratorState.prompt}
              onClick={handleDisplayTextWindow}
            />
          )}
        </div>
      </div>
      {!isFirstIdea ? (
        <MainBlockConnector className="mr-[-4px]" />
      ) : (
        <div className="bg-brainstormySecondary ml-[7px] h-[1px] w-[38px]"></div>
      )}
      {displayPrompt && (
        <ModalContainer onEscape={handleCloseTextWindow}>
          <ViewOnlyEnterTextInput
            initialText={ideaGeneratorState.prompt}
            heading="Введённый впомогательный промпт"
            onReady={handleCloseTextWindow}
          />
        </ModalContainer>
      )}
    </div>
  );
};
