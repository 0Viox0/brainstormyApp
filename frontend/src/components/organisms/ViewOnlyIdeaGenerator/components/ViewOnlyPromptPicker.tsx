import { WithTooltip } from '@/components/molecules';
import { TextDefaultIcon } from '@/shared/icons';
import { cn } from '@/shared/utils';
import type { FC } from 'react';

export type ViewOnlyPromptPickerProps = {
  isPromptEmpty: boolean;
  className?: string;
  onClick: () => void;
};

export const ViewOnlyPromptPicker: FC<ViewOnlyPromptPickerProps> = ({
  isPromptEmpty,
  className,
  onClick,
}) => {
  return (
    <div className="relative">
      <WithTooltip
        tooltipText="Посмотреть введённый промпт"
        className="top-[-100%] left-1/2 -translate-x-1/2 text-nowrap"
      >
        <div
          className={cn(
            `bg-brainstormySecondary flex aspect-square w-8 items-center
            justify-center overflow-hidden rounded-[37px] p-2
            hover:cursor-pointer`,
            className,
          )}
          onClick={onClick}
        >
          <TextDefaultIcon />
        </div>
      </WithTooltip>
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
