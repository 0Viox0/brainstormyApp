import { ThreeWayLine } from '@/components/atoms';
import { cn } from '@/shared/utils';
import type { FC } from 'react';

export type GraphConnectorProps = {
  currentIndex: number;
  spaceBetweenIdeaGeneratorsPx: number;
  putMountPointInFrontOfNthGenerator: number;
};

export const GraphConnector: FC<GraphConnectorProps> = ({
  currentIndex,
  putMountPointInFrontOfNthGenerator,
  spaceBetweenIdeaGeneratorsPx,
}) => {
  const calculateMountPoint = (index: number) => {
    const something =
      (putMountPointInFrontOfNthGenerator - index) *
      spaceBetweenIdeaGeneratorsPx;

    if (something === 0) {
      return 1;
    }

    if (something < 0) {
      return -something;
    }

    return something;
  };

  return (
    <ThreeWayLine
      className={cn('absolute top-1/2 left-0 -translate-x-full', {
        '-translate-y-full -scale-x-100':
          putMountPointInFrontOfNthGenerator - currentIndex < 0,
      })}
      width={100}
      height={calculateMountPoint(currentIndex)}
    />
  );
};
