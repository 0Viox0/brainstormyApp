import { TextDefaultIcon } from '@/shared/icons';
import { PromptPicker } from '../PromptPicker/PromptPicker';
import { WithDefaultPicker } from '../WithDefaultPicker';
import { useState, type FC } from 'react';

const TEXT_DEFAULT_VALUE = ''; // empty string is the default value

export type PromptPickerWithDefaultSetterProps = {
  onPromptChange: (prompt: string) => void;
};

export const PromptPickerWithDefaultSetter: FC<
  PromptPickerWithDefaultSetterProps
> = ({ onPromptChange }) => {
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);

  const handleDefaultPickerClick = () => {
    setCurrentPrompt(TEXT_DEFAULT_VALUE);
    onPromptChange(TEXT_DEFAULT_VALUE);
  };

  const handlePromptChange = (newPrompt: string) => {
    setCurrentPrompt(newPrompt);
    onPromptChange(newPrompt);
  };

  const chooseIcon = () => {
    if (currentPrompt) {
      return '...';
    }

    if (currentPrompt === '') {
      return '-';
    }

    return <TextDefaultIcon />;
  };

  return (
    <WithDefaultPicker
      pickedSomething={currentPrompt !== null}
      onDefaultPickerClick={handleDefaultPickerClick}
    >
      <PromptPicker icon={chooseIcon()} onTextEnter={handlePromptChange} />
    </WithDefaultPicker>
  );
};
