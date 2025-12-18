import { cn } from '@/shared/utils';
import type { FC } from 'react';

export type ThreeWayLineProps = {
  width: number;
  height: number;
  className: string;
};

export const ThreeWayLine: FC<ThreeWayLineProps> = ({
  width = 60,
  height = 100,
  className,
}) => {
  const angleX = (width * 1) / 3;
  const angleY = (height * 0.4) / 2;
  const lineLength = (width * 1) / 6;

  const lineHeight = height * 0.6;

  const d = `M0 ${height} l ${lineLength} 0 c ${angleX} 0, ${angleX} 0, ${angleX} -${angleY} l 0 -${lineHeight} c 0 -${angleY}, 0 -${angleY}, ${angleX} -${angleY} l ${lineLength} 0`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
    >
      <path stroke="#9c9c9c" fill="transparent" strokeWidth="1.5" d={d}></path>
    </svg>
  );
};
