import { cn } from '@/shared/utils';
import type { FC, HTMLAttributes } from 'react';

export type TextFieldLoaderProps = {
  className?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
};

export const TextFieldLoader: FC<TextFieldLoaderProps> = ({
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        'bg-brainstormySecondary h-[14px] rounded-full',
        `from-brainstormySecondary via-brainstormySecondary/60
        to-brainstormySecondary bg-gradient-to-r`,
        'animate-[shimmer_1.4s_ease-in-out_infinite] bg-[length:200%_100%]',
        className,
      )}
      style={style}
    />
  );
};
