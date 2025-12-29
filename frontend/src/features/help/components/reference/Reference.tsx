import { BorderedBrainstormyModal } from '@/components/molecules';
import type { FC } from 'react';

const COPYWRITING = {
  initialParagraph: 'Краткие описания каждого способа сгенерировать идеи:',
  ideaDefinitionParagrpahs: [
    {
      title: 'Сгенерировать 10 идей',
      content:
        'Использует быстрый метод фрирайтинга для спонтанного создания множества вариантов. Этот инструмент не анализирует и не трансформирует, а фокусируется на количестве, генерируя 10 разнообразных, иногда неожиданных, идей на основе вашего начального запроса. Идеально для поиска вдохновения и выхода за рамки привычного мышления.',
    },
    {
      title: 'Трансформировать идею',
      content:
        'Использует методологию SCAMPER, чтобы творчески изменить и расширить вашу исходную мысль. Этот инструмент задаст провокационные вопросы (например, «Что можно заменить?», «Как объединить с другой идеей?», «Что можно приспособить?»), помогая найти неочевидные улучшения, новые применения или радикальные изменения вашей идеи.',
    },
    {
      title: 'Проанализировать с разных сторон',
      content:
        'Использует метод «Шести шляп мышления» Эдварда де Боно, чтобы всесторонне оценить идею. Этот инструмент рассмотрит вашу мысль с шести различных перспектив: факты, эмоции, риски, преимущества, творчество и процесс. Это поможет выявить слабые места, увидеть возможности и принять взвешенное решение.',
    },
  ],
};

export type ReferenceProps = {
  onCloseReference: () => void;
};

export const Reference: FC<ReferenceProps> = ({ onCloseReference }) => {
  return (
    <BorderedBrainstormyModal
      title="О приложении"
      onModalEscape={onCloseReference}
    >
      <div className="h-[300px] w-[700px] overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <p className="mb-[40px]">{COPYWRITING.initialParagraph}</p>
          {COPYWRITING.ideaDefinitionParagrpahs.map((paragraph) => (
            <div key={paragraph.title} className="mb-[40px] space-y-2">
              <h3 className="font-bold">{paragraph.title}</h3>
              <p>{paragraph.content}</p>
            </div>
          ))}
        </div>
      </div>
    </BorderedBrainstormyModal>
  );
};
