import { Tooltip } from '@/components/atoms';
import { cn } from '@/shared/utils';
import { useState, type FC, type HTMLAttributes, type ReactNode } from 'react';

export type WithTooltipProps = {
  tooltipText: string;
  className?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
  children: ReactNode;
};

export const WithTooltip: FC<WithTooltipProps> = ({
  tooltipText,
  className,
  style,
  children,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </div>
      {isHovering && (
        <Tooltip
          className={cn(className, 'absolute')}
          style={style}
          text={tooltipText}
        />
      )}
    </div>
  );
};
