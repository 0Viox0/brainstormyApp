import { BorderedDiv, ModalContainer } from '@/components/atoms';
import type { FC } from 'react';
import { ModalContentTemplate } from './ModalContentTemplate';

export type ModalManagerProps = {
  onCloseTutorial: () => void;
};

const COPYWRITING = {
  firstParagraph:
    'Brainstormy — это приложение для структурированного создания и развития идей. Это не ChatGPT или DeepSeek.',
  seconParagraph: [
    'Если вам нужен ответ, факт или развернутое объяснение — используйте их.',
    'Если вам нужно придумать, изобрести или улучшить что-то своё — вы в нужном месте.',
  ],
  thirdParagraph:
    'Brainstormy помогает превратить одну мысль в множество, исследуя её с разных сторон удобным визуальным способом.',
};

export const ModalManager: FC<ModalManagerProps> = ({ onCloseTutorial }) => {
  return (
    <ModalContentTemplate headerText="Обучение">
      <p>{COPYWRITING.firstParagraph}</p>
      <p>
        <ul>
          {COPYWRITING.seconParagraph.map((text) => (
            <li>{text}</li>
          ))}
        </ul>
      </p>
      <p>{COPYWRITING.thirdParagraph}</p>
    </ModalContentTemplate>
  );
};
