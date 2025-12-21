import type { FC } from 'react';
import { IdeaGeneratorLoader } from './components/IdeaGeneratorLoader/IdeaGeneratorLoader';
import { GraphConnector } from '@/components/molecules';
import { TextFieldLoader } from '@/components/atoms';

export type LayerLoaderProps = {
  ideasCount: number;
  mountPointAgainstIdeaNumber: number;
};

export const LayerLoader: FC<LayerLoaderProps> = ({
  ideasCount,
  mountPointAgainstIdeaNumber,
}) => {
  return (
    <>
      {Array.from({ length: ideasCount }).map((_, index) => (
        <div
          className="relative mb-[58px] flex h-[129px] items-center"
          key={index}
        >
          <GraphConnector
            currentIndex={index}
            putMountPointInFrontOfNthGenerator={mountPointAgainstIdeaNumber}
            spaceBetweenIdeaGeneratorsPx={187}
          />
          <div
            className="border-brainstormySecondary flex aspect-square w-12
              items-center justify-center rounded-[13px] border-[3px]"
          >
            <TextFieldLoader className="h-[18px] w-[30px] rounded-[4px]" />
          </div>
          <div
            className="border-t-brainstormySecondary w-[22px] border-t-[1px]
              border-dashed"
          />
          <IdeaGeneratorLoader />
        </div>
      ))}
    </>
  );
};
