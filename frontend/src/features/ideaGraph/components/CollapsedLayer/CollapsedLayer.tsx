import type { FC } from 'react';
import { useIdeasGraph } from '../../store';
import { GenerateIdeaButton } from '@/components/atoms';
import { BulbForOpenLayer, SixHatsLogo } from '@/shared/icons';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { ViewOnlyIdeaGenerator } from '@/components/organisms/ViewOnlyIdeaGenerator/ViewOnlyIdeaGenerator';
import type { SixHatsKeys } from '../OpenLayer/kinds/SixHatsLayer/SixHatsLayer';
import { WithTooltip } from '@/components/molecules';
import type { CollapsedData } from '../../store/state';

export type CollapsedLayerProps = {
  layerId: number;
};

export const CollapsedLayer: FC<CollapsedLayerProps> = ({ layerId }) => {
  const layer = useIdeasGraph((state) =>
    state.layers.find((layer) => layer.id === layerId),
  );
  const { goToLayer, changeLayer } = useIdeasGraph((state) => state);

  if (!layer) return <></>;

  const handleGoToLayer = () => {
    goToLayer(layerId);
    changeLayer(layerId, {
      ...layer,
      collapsedData: {
        ...layer.collapsedData,
        isCollapsed: false,
      } as CollapsedData,
    });
  };

  const renderChosenIdeaLogo = () => {
    if (layer.method === 'sixHats') {
      const hatsColorMap: Record<SixHatsKeys, string> = {
        blue: '#4f62ae',
        white: '#fff',
        green: '#48b86a',
        yellow: '#e2e665',
        black: '#000',
        red: '#c73939',
      };

      const chosenHat = Object.entries(layer.ideas).find(
        ([, idea]) => idea.chosen,
      );

      if (!chosenHat) return;

      return <SixHatsLogo color={hatsColorMap[chosenHat[0]]} />;
    }

    if (layer.method === 'scamper') {
      const chosenEntry = Object.entries(layer.ideas).find(
        ([, idea]) => idea.chosen,
      );

      if (!chosenEntry) return;

      return <div className="font-bold">{chosenEntry[0].toUpperCase()}</div>;
    }

    if (layer.method === 'generator') {
      const chosenEntry = Object.entries(layer.ideas).find(
        ([, idea]) => idea.chosen,
      );

      if (!chosenEntry) return;

      const createIdeaIcon = (ideaNumber: string) => {
        return (
          <div className="relative">
            <BulbForOpenLayer />
            <span
              className="absolute top-[40%] left-1/2 -translate-1/2 font-bold
                text-[#DBB345]"
            >
              {ideaNumber}
            </span>
          </div>
        );
      };

      return createIdeaIcon(chosenEntry[0]);
    }
  };

  const getIdeaGeneratorState = (): IdeaGeneratorState => {
    const chosenEntry = Object.entries(layer.ideas).find(
      ([, idea]) => idea.chosen,
    );

    if (!chosenEntry || !layer.collapsedData) {
      return {
        text: '',
        method: 'sixHats',
        prompt: '',
      };
    }

    const chosenIdea = chosenEntry[1];

    return {
      text: chosenIdea.content,
      method: layer.collapsedData.chosenMethod,
      prompt: layer.collapsedData.chosenPrompt,
    };
  };

  const getLayerIdeasLength = () => {
    return Object.keys(layer.ideas).length;
  };

  return (
    <div className="flex items-center">
      <div className="relative flex flex-col items-center">
        <WithTooltip
          tooltipText="Перейти на этот слой"
          className="top-[-35px] left-1/2 -translate-x-1/2 text-nowrap"
        >
          <GenerateIdeaButton onClick={handleGoToLayer} />
        </WithTooltip>
        <div className="absolute top-[100%] flex flex-col items-center">
          <div className="bg-brainstormySecondary h-[30px] w-[2px]" />
          <div
            className="border-brainstormySecondary bg-brainstormyBg
              text-brainstormyPrimary flex aspect-square w-9 items-center
              justify-center rounded-full border-[2px] active:scale-100"
          >
            {getLayerIdeasLength()}
          </div>
        </div>
      </div>
      <div className="bg-brainstormySecondary h-[1px] w-[43px]" />

      <div
        className="border-brainstormySecondary flex aspect-square w-12
          items-center justify-center rounded-[13px] border-[3px] font-bold"
      >
        {renderChosenIdeaLogo()}
      </div>

      <div
        className="border-t-brainstormySecondary w-[22px] border-t-[1px]
          border-dashed"
      />

      <ViewOnlyIdeaGenerator ideaGeneratorState={getIdeaGeneratorState()} />
    </div>
  );
};
