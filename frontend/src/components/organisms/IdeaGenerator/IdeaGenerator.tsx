import { IdeaTextHolder } from '@/components/atoms';
import {
  MethodPickerWithDefaultSetter,
  PromptPickerWithDefaultSetter,
} from '@/components/molecules';
import type { PickOption } from '@/components/molecules/MethodPicker/MethodPicker';

export const IdeaGenerator = () => {
  const handleOptionClick = (option: PickOption) => {
    console.log('option was changed to', option);
  };

  const handlePromptChange = (newPrompt: string) => {
    console.log('prompt was changed to', newPrompt);
  };

  return (
    <div className="relative">
      <IdeaTextHolder text={'here is some text'} />
      <div className="absolute top-1/2 left-[94%] -translate-y-1/2 space-y-4">
        <MethodPickerWithDefaultSetter onOptionPick={handleOptionClick} />
        <PromptPickerWithDefaultSetter onPromptChange={handlePromptChange} />
      </div>
    </div>
  );
};
