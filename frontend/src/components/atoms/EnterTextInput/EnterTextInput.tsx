import { useState, type ChangeEvent, type FC } from 'react';
import { TextLengthLimit } from '../TextLengthLimit';

export type EnterTextInputProps = {
  initialText: string;
  heading: string;
  placeholder: string;
  onTextChange: (newText: string) => void;
};

export const EnterTextInput: FC<EnterTextInputProps> = ({
  initialText,
  heading,
  placeholder,
  onTextChange,
}) => {
  const [text, setText] = useState(initialText);

  const handleEnterText = () => {
    onTextChange(text);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div
      className="border-brainstormySecondary w-[480px] rounded-[9px]
        border-[1px] px-10 pb-6"
    >
      <div
        className="text-brainstormySecondary mt-5 text-center text-[1.25rem]
          font-bold"
      >
        {heading}
      </div>
      <textarea
        className="border-brainstormySecondary text-brainstormySecondary
          focus:border-brainstormyPrimary my-4 h-[250px] w-full resize-none
          rounded-[7px] border-[1px] p-3 transition-colors duration-200
          outline-none"
        onChange={handleTextChange}
        value={text}
        placeholder={placeholder}
        maxLength={import.meta.env.VITE_PROMPT_MAX_SYMBOLS}
      />
      <div className="flex w-full items-center justify-between">
        <TextLengthLimit
          text={text}
          maxLength={import.meta.env.VITE_PROMPT_MAX_SYMBOLS}
        />
        <button
          onClick={handleEnterText}
          className="bg-brainstormySecondary rounded-[7px] px-7 py-0.5
            text-center text-white transition-all duration-300 ease-in-out
            hover:cursor-pointer hover:px-9"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
