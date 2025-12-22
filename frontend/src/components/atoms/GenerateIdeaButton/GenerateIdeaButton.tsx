import { BrainstormActive } from '@/shared/icons';
import { cn } from '@/shared/utils';
import type { FC, MouseEvent } from 'react';

export type GenerateIdeaButtonProps = {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

export const GenerateIdeaButton: FC<GenerateIdeaButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        `border-brainstormySecondary bg-brainstormyBg flex aspect-square w-9
        items-center justify-center rounded-full border-[2px]
        drop-shadow-[0px_0px_4px_rgba(139,92,246,1)] transition-all duration-100
        ease-in-out hover:scale-[1.1] hover:cursor-pointer active:scale-100`,
        className,
      )}
      onClick={onClick}
    >
      <div className="ml-[2px]">
        <BrainstormActive />
      </div>
    </div>
  );
};
