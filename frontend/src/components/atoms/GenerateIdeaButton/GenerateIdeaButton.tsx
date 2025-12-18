import { BrainstormActive } from '@/shared/icons';
import type { FC, MouseEvent } from 'react';

export type GenerateIdeaButtonProps = {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export const GenerateIdeaButton: FC<GenerateIdeaButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      className="border-brainstormySecondary bg-brainstormyBg flex aspect-square
        w-9 items-center justify-center rounded-full border-[2px]
        drop-shadow-[0px_0px_4px_rgba(139,92,246,1)] transition-all duration-100
        ease-in-out hover:scale-[1.1] hover:cursor-pointer active:scale-100"
      onClick={onClick}
    >
      <div className="ml-[2px]">
        <BrainstormActive />
      </div>
    </div>
  );
};
