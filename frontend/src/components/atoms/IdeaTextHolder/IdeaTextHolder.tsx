import { cn } from '@/shared/utils';
import { useState, type FC } from 'react';

export type IdeaTextHolderProps = {
  text: string;
};

export const IdeaTextHolder: FC<IdeaTextHolderProps> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border-brainstormySecondary w-[288px] rounded-[22px]
        border-[1px] p-[25px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn('h-full w-full text-center', {
          'line-clamp-3': !isHovered,
        })}
      >
        {text}
      </div>
    </div>
  );
};
