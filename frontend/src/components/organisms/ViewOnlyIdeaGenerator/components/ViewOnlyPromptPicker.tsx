import { TextDefaultIcon } from '@/shared/icons';
import { cn } from '@/shared/utils';
import type { FC } from 'react';

export type ViewOnlyPromptPickerProps = {
  isPromptEmpty: boolean;
};

export const ViewOnlyPromptPicker: FC<ViewOnlyPromptPickerProps> = ({
  isPromptEmpty,
}) => {
  return (
    <div className="relative">
      <div
        className="bg-brainstormySecondary flex aspect-square w-8 items-center
          justify-center overflow-hidden rounded-[37px] p-2"
      >
        <TextDefaultIcon />
      </div>
      <div
        className={cn(
          `bg-brainstormySecondary absolute right-[-5px] bottom-[-4px] h-4 w-4
          rounded-full border-[3.5px] border-[#232323]`,
          {
            'bg-[#579e67]': !isPromptEmpty,
          },
        )}
      />
    </div>
  );
};
