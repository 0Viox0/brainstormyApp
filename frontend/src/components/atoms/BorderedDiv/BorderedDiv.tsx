import { cn } from '@/shared/utils';
import type { FC, HTMLAttributes, ReactNode } from 'react';

export type BorderedDivProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const BorderedDiv: FC<BorderedDivProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        `border-brainstormySecondary bg-brainstormyBg flex rounded-[9px]
        border-[1px] px-[22px] py-[8px]`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
