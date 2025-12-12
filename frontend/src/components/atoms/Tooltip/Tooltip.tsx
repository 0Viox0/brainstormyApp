import { cn } from '@/shared/utils';
import type { FC, HTMLAttributes } from 'react';

export type TooltipProps = {
  text: string;
  className?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
};

export const Tooltip: FC<TooltipProps> = ({ text, style, className }) => {
  return (
    <div
      className={cn(
        'z-50 rounded-[4px] bg-[#404040] px-5 text-[#9A9A9A]',
        className,
      )}
      style={style}
    >
      {text}
    </div>
  );
};
