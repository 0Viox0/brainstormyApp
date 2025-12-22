import { cn } from '@/shared/utils';
import type { FC, MouseEvent } from 'react';

export type GoFurtherButtonProps = {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

export const GoFurtherButton: FC<GoFurtherButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        `border-brainstormySecondary flex aspect-square w-9 items-center
        justify-center rounded-full border-[2px] bg-[rgba(217,217,217,0.04)]
        font-bold drop-shadow-[0px_0px_4px_rgba(139,92,246,1)] transition-all
        duration-100 ease-in-out hover:scale-[1.1] hover:cursor-pointer
        active:scale-100`,
        className,
      )}
      onClick={onClick}
    >
      <div
        className="text-brainstormyPrimary absolute bottom-[5px] text-[1.4rem]
          font-bold select-none"
      >
        ...
      </div>
    </div>
  );
};
