import { IdeaGenerator } from '@/components/organisms/IdeaGenerator';
import type { IdeaGeneratorState } from '@/components/organisms/IdeaGenerator/IdeaGenerator';
import { SixHatsLogo } from '@/shared/icons';
import type { FC } from 'react';

export type SixHatsProps = {
  onGenerateIdea: (ideaGeneratorState: IdeaGeneratorState) => void;
  data: {
    blue: string;
    white: string;
    green: string;
    yellow: string;
    black: string;
    red: string;
  };
};

const buildPath = (
  mount: { x: number; y: number },
  hat: { x: number; y: number },
  radius = 8,
) => {
  const splitX = mount.x + (hat.x - mount.x) / 2;
  const dirY = hat.y > mount.y ? 1 : -1;

  return `
    M ${mount.x} ${mount.y}
    H ${splitX - radius}
    Q ${splitX} ${mount.y} ${splitX} ${mount.y + radius * dirY}
    V ${hat.y - radius * dirY}
    Q ${splitX} ${hat.y} ${splitX + radius} ${hat.y}
    H ${hat.x}
  `;
};

export const SixHatsLayer: FC<SixHatsProps> = ({ data, onGenerateIdea }) => {
  const createHatIcon = (hatColor: keyof SixHatsProps['data']) => {
    const hatsColorMap: Record<keyof typeof data, string> = {
      blue: '#4f62ae',
      white: '#fff',
      green: '#48b86a',
      yellow: '#e2e665',
      black: '#000',
      red: '#c73939',
    };

    return <SixHatsLogo color={hatsColorMap[hatColor]} />;
  };

  return (
    <div>
      {Object.entries(data).map(([hatColor, idea], index) => (
        <div className="mb-[58px] flex items-center" key={index}>
          <div
            className="border-brainstormySecondary flex aspect-square w-12
              items-center justify-center rounded-[13px] border-[3px]"
          >
            {createHatIcon(hatColor as keyof SixHatsProps['data'])}
          </div>
          <div
            className="border-t-brainstormySecondary w-[22px] border-t-[1px]
              border-dashed"
          />
          <IdeaGenerator text={idea} onGenerate={onGenerateIdea} />
        </div>
      ))}
    </div>
  );
};
