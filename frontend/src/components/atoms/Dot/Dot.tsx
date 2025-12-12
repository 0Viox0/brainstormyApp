import { cn } from '@/shared/utils';
import type { FC } from 'react';

export type DotProps = {
  color: 'green' | 'red';
};

export const Dot: FC<DotProps> = ({ color }) => {
  return (
    <div
      className={cn('h-2 w-2 rounded-full bg-[#934a4a]', {
        'bg-[#579e67]': color === 'green',
      })}
    ></div>
  );
};
