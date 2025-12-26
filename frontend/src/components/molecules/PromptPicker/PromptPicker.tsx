import { EnterTextInput, ModalContainer, Tooltip } from '@/components/atoms';
import { cn } from '@/shared/utils';
import { useState, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type PromptPickerProps = {
  onTextEnter?: (newPrompt: string) => void;
  icon: ReactNode;
  hoverText?: string;
  disabled?: boolean;
};

export const PromptPicker: FC<PromptPickerProps> = ({
  icon,
  hoverText,
  onTextEnter,
  disabled,
}) => {
  const [savedText, setSavedText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleIconClick = () => {
    if (disabled) return;
    setOpenModal(true);
  };

  const handleTextChange = (newText: string) => {
    setOpenModal(false);
    setSavedText(newText);
    onTextEnter?.(newText);
  };

  return (
    <div className="relative">
      <div
        className="bg-brainstormySecondary flex aspect-square w-8 items-center
          justify-center overflow-hidden rounded-[37px] p-2
          hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleIconClick}
      >
        {icon}
      </div>
      <div
        className={cn(
          `bg-brainstormySecondary absolute right-[-5px] bottom-[-4px] h-4 w-4
          rounded-full border-[3.5px] border-[#232323]`,
          {
            'bg-[#579e67]': Boolean(savedText),
          },
        )}
      />
      {openModal &&
        createPortal(
          <ModalContainer onEscape={() => setOpenModal(false)}>
            <EnterTextInput
              initialText={savedText}
              onTextChange={handleTextChange}
              heading="Введите впомогательный промпт"
              placeholder="Введите промпт, который поможет генерировать идеи"
            />
          </ModalContainer>,
          document.body,
        )}
      {isHovered && (
        <Tooltip
          text={hoverText || ''}
          className="absolute top-[-100%] left-1/2 -translate-x-1/2 text-nowrap"
        />
      )}
    </div>
  );
};
