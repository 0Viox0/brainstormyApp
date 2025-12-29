import { cn } from '@/shared/utils';
import type { ButtonHTMLAttributes, FC, Ref } from 'react';

export type BorderedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

export const BorderedButton: FC<BorderedButtonProps> = ({
  ref,
  children,
  className,
  ...props
}) => {
  return (
    <button
      ref={ref}
      className={cn(
        `border-brainstormySecondary bg-brainstormyBg
        hover:bg-brainstormySecondary/10 active:bg-brainstormySecondary/20
        focus:ring-brainstormySecondary/50 flex items-center justify-center
        rounded-[9px] border-[1px] px-6 py-2 transition-all duration-200
        hover:cursor-pointer focus:ring-2 focus:outline-none
        disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
