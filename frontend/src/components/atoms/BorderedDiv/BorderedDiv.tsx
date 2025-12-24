import { cn } from '@/shared/utils';
import type { FC, ReactNode } from 'react';

export type BorderedDivProps = {
  children: ReactNode;
  className?: string;
};

export const BorderedDiv: FC<BorderedDivProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `border-brainstormySecondary bg-brainstormyBg flex rounded-[9px]
        border-[1px] px-[22px] py-[8px]`,
        className,
      )}
    >
      {children}
    </div>
  );
};
