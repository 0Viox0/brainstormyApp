import type { Method } from '@/features/ideaGraph/store/state';
import { LightBulbIcon, ScamperLogo, SixHatsLogo } from '@/shared/icons';
import { cn } from '@/shared/utils';
import { type FC } from 'react';

export type PickerProps = {
  method: Method;
  className?: string;
};

export const ViewOnlyMethodPicker: FC<PickerProps> = ({
  method,
  className,
}) => {
  const getMethodIcon = () => {
    if (method === 'sixHats') {
      return <SixHatsLogo />;
    }

    if (method === 'generator') {
      return <LightBulbIcon className="mb-[-1px] ml-[1px]" />;
    }

    return <ScamperLogo />;
  };

  return (
    <div className="relative w-8">
      <div
        className={cn(
          `bg-brainstormySecondary absolute right-0 bottom-0 flex h-[32px] w-8
          origin-bottom flex-col items-center justify-end overflow-hidden
          rounded-[37px] p-2 transition-all duration-[0.2s] ease-in-out`,
          className,
        )}
      >
        <span className="flex-0">{getMethodIcon()}</span>
      </div>
    </div>
  );
};
