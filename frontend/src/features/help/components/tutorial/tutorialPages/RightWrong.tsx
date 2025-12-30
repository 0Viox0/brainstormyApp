import { CheckmarkIcon, CrossIcon } from '@/shared/icons';

const COPYWRITING = {
  firstParagraph:
    'Введите свою собственную идею для развития, а не вопрос для поиска ответа. Brainstormy работает с вашими идеями, а не с фактами.',
};

const WRONG_LIST = [
  'Напиши эссе о Наполеоне',
  'Объясни квантовую физику',
  'Переведи это на английский язык....',
  'Сгенерируй код на Python для парсинга сайта',
];

const RIGHT_LIST = [
  'Имена котов начинающиеся с буквы г',
  'Улучшение качества обслуживания клиентов ресторана',
  'Приложение для учёта личных финансов',
];

export const RightWrong = () => {
  return (
    <>
      <p>{COPYWRITING.firstParagraph}</p>
      <div className="mt-[20px] flex w-full justify-between">
        <div className="flex w-[47%] flex-col space-y-4">
          {WRONG_LIST.map((text, index) => (
            <div
              className="flex items-center justify-start space-x-4"
              key={index}
            >
              <CrossIcon className="shrink-0 grow-0" />
              <div>{text}</div>
            </div>
          ))}
        </div>
        <div className="flex w-[47%] flex-col space-y-3">
          {RIGHT_LIST.map((text, index) => (
            <div
              className="flex items-center justify-start space-x-4"
              key={index}
            >
              <CheckmarkIcon className="shrink-0 grow-0" />
              <div>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
