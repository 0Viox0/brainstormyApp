import { Tooltip } from '@/components/atoms';
import { useState, type FC, type ReactNode } from 'react';

export type PromptPickerProps = {
  onTextEnter: (newPrompt: string) => void;
  icon: ReactNode;
};

export const PromptPicker: FC<PromptPickerProps> = ({ icon, onTextEnter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <div
        className="bg-brainstormySecondary flex aspect-square w-8 items-center
          justify-center overflow-hidden rounded-[37px] p-2
          hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon}
      </div>
      {isHovered && (
        <Tooltip
          text="Click to edit helper text"
          className="absolute top-[-100%] left-1/2 -translate-x-1/2 text-nowrap"
        />
      )}
    </div>
  );
};
