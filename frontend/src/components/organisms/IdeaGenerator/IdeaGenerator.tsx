import { GenerateIdeaButton, IdeaTextHolder } from '@/components/atoms';
import { PromptPicker, WithTooltip } from '@/components/molecules';
import {
  type PickOption,
  MethodPicker,
} from '@/components/molecules/MethodPicker/MethodPicker';
import { useIdeasGraph } from '@/features/ideaGraph/store';
import type { Method } from '@/features/ideaGraph/store/state';
import {
  LightBulbIcon,
  ScamperLogo,
  SixHatsLogo,
  TextDefaultIcon,
} from '@/shared/icons';
import { MainBlockConnector } from '@/shared/images';
import { cn } from '@/shared/utils';
import { useState, type FC } from 'react';

type Prompt = string;
export type IdeaGeneratorState = {
  layerId?: number;
  text: string;
  method: Method;
  prompt: Prompt;
};

export type IdeaGeneratorProps = {
  text: string;
  onGenerate: (ideaGeneratorState: IdeaGeneratorState) => void;
  isFirstIdea?: boolean;
};

const defaultIdeaGeneratorState: IdeaGeneratorState = {
  text: '',
  method: 'generator',
  prompt: '',
};

export const IdeaGenerator: FC<IdeaGeneratorProps> = ({
  text,
  onGenerate,
  isFirstIdea,
}) => {
  const [ideaGeneratorState, setIdeaGeneratorState] =
    useState<IdeaGeneratorState>({ ...defaultIdeaGeneratorState, text });
  const { layers } = useIdeasGraph((state) => state);

  const methodOptions: PickOption[] = [
    {
      id: 3,
      icon: <LightBulbIcon className="mb-[-1px]" />,
      name: 'Генератор',
      type: 'generator',
    },
    {
      id: 2,
      icon: <ScamperLogo />,
      name: 'Скампер',
      type: 'scamper',
    },
    {
      id: 1,
      icon: <SixHatsLogo />,
      name: 'Шесть шляп',
      type: 'sixHats',
    },
  ];

  const handleOptionClick = (optionId: number) => {
    setIdeaGeneratorState((prevState) => ({
      ...prevState,
      method:
        methodOptions.find((option) => optionId === option.id)?.type ||
        prevState.method,
    }));
  };

  const handlePromptChange = (newPrompt: string) => {
    setIdeaGeneratorState((prevState) => ({
      ...prevState,
      prompt: newPrompt,
    }));
  };

  const handleGenerateIdea = () => {
    onGenerate(ideaGeneratorState);
  };

  const getDefaultOptionId = () =>
    methodOptions.find(
      (option) => option.type === defaultIdeaGeneratorState.method,
    )?.id || 1;

  return (
    <div className="relative flex items-center">
      <div className="relative mr-[7px]">
        <IdeaTextHolder text={text} />
        <div
          className={cn(
            'absolute top-1/2 left-[94%] z-40 -translate-y-[8px] space-y-4',
            {
              'top-[67%]': isFirstIdea,
            },
          )}
        >
          <MethodPicker
            options={methodOptions}
            defaultOptionId={getDefaultOptionId()}
            onOptionPick={handleOptionClick}
          />
          {!isFirstIdea && (
            <PromptPicker
              hoverText="Вспомогательный промпт"
              onTextEnter={handlePromptChange}
              icon={<TextDefaultIcon />}
            />
          )}
        </div>
      </div>
      {!isFirstIdea ? (
        <MainBlockConnector className="mr-[-4px]" />
      ) : (
        <div className="bg-brainstormySecondary ml-[7px] h-[1px] w-[38px]"></div>
      )}
      {(layers.length === 0 || !isFirstIdea) && (
        <WithTooltip
          tooltipText="Сгенерировать идеи"
          className="top-1/2 left-[130%] -translate-y-1/2 text-nowrap"
        >
          <GenerateIdeaButton onClick={handleGenerateIdea} />
        </WithTooltip>
      )}
    </div>
  );
};
