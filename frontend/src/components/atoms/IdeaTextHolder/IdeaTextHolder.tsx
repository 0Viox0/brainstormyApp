import { cn } from '@/shared/utils';
import { useState, useRef, type FC, useLayoutEffect } from 'react';

// should be the same number
const containerPadding = 25;
const containerPaddingClass = `p-[25px]`;

export type IdeaTextHolderProps = {
  text: string;
  className?: string;
};

export const IdeaTextHolder: FC<IdeaTextHolderProps> = ({
  text,
  className,
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const outerContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outerEl = outerContainerRef.current;
    const el = containerRef.current;

    if (el && outerEl) {
      setIsOverflowing(
        outerEl.clientHeight - containerPadding * 2 < el.clientHeight,
      );
    }
  }, [text]);

  return (
    <div
      ref={outerContainerRef}
      className={cn(
        `border-brainstormySecondary bg-brainstormyBg relative h-[129px]
        w-[288px] overflow-hidden rounded-[22px] border-[1px] text-center
        hover:z-30`,
        containerPaddingClass,
        {
          'flex items-center justify-center': !isOverflowing,
          'h-auto': isOverflowing && isHovered,
        },
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {
        <div
          ref={containerRef}
          className={cn('', {
            'line-clamp-3': isOverflowing && !isHovered,
          })}
        >
          {text}
        </div>
      }
    </div>
  );
};
