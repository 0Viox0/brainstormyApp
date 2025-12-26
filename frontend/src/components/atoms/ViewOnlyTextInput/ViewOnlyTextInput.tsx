import { type FC } from 'react';

export type ViewOnlyEnterTextInputProps = {
  initialText: string;
  heading: string;
  onReady: () => void;
};

export const ViewOnlyEnterTextInput: FC<ViewOnlyEnterTextInputProps> = ({
  initialText,
  heading,
  onReady,
}) => {
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
        value={initialText}
        disabled
      />
      <div className="flex items-center justify-center">
        <button
          onClick={onReady}
          className="bg-brainstormySecondary mx-auto rounded-[7px] px-7 py-0.5
            text-center text-white transition-all duration-300 ease-in-out
            hover:cursor-pointer hover:px-9"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
