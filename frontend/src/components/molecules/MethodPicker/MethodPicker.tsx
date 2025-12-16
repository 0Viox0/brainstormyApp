import { Tooltip } from '@/components/atoms';
import {
  useEffect,
  useState,
  type FC,
  type MouseEvent,
  type ReactNode,
} from 'react';

export type PickOption = {
  id: number;
  name: string;
  icon: ReactNode;
};

type ToolTipState = {
  name: string;
  position: TooltipPosition;
};

type TooltipPosition = {
  x: number;
  y: number;
};

export type PickerProps = {
  currentOption?: PickOption;
  defaultOption: PickOption;
  options: PickOption[];
  onOptionPick: (option: PickOption) => void;
};

const APPROXIMATE_ITEM_HEIGHT = 32; // px

export const MethodPicker: FC<PickerProps> = ({
  currentOption,
  defaultOption,
  onOptionPick,
  options,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentOptionInner, setCurrentOptionInner] =
    useState<PickOption | null>(currentOption ?? null);
  const [tooltipState, setTooltipState] = useState<ToolTipState | null>(null);

  useEffect(() => {
    setCurrentOptionInner(currentOption ?? null);
  }, [currentOption]);

  const calculateHeight = () =>
    APPROXIMATE_ITEM_HEIGHT *
      (options.filter(
        (option) => !currentOptionInner || option.id !== currentOptionInner.id,
      ).length +
        1) +
    4;

  const handleOptionClick = (option: PickOption) => {
    setCurrentOptionInner(option);
    setIsHovered(false);

    onOptionPick(option);
  };

  const handlePickerMouseLeave = () => {
    setIsHovered(false);
    handleOptionMouseLeave();
  };

  const handleOptionMouseEnter = (
    event: MouseEvent<HTMLSpanElement>,
    option: PickOption,
  ) => {
    const hoveredIcon = event.target as HTMLElement;
    const rect = hoveredIcon.getBoundingClientRect();

    const container = hoveredIcon.closest('.relative') as HTMLElement;
    const containerRect = container.getBoundingClientRect();

    const relativeY = containerRect.bottom - rect.bottom - 4;

    setTooltipState({
      name: option.name,
      position: {
        x: 40,
        y: relativeY,
      },
    });
  };

  const handleDefaultIconHover = (event: MouseEvent<HTMLSpanElement>) => {
    setIsHovered(true);

    handleOptionMouseEnter(event, currentOptionInner || defaultOption);
  };

  const handleOptionMouseLeave = () => {
    setTooltipState(null);
  };

  return (
    <div className="relative w-8">
      <div
        className="bg-brainstormySecondary absolute right-0 bottom-0 flex w-8
          origin-bottom flex-col items-center justify-end overflow-hidden
          rounded-[37px] px-2 py-[6px] transition-all duration-[0.2s]
          ease-in-out hover:cursor-pointer"
        onMouseLeave={handlePickerMouseLeave}
        style={{
          height: `${!isHovered ? 32 : calculateHeight()}px`,
        }}
      >
        {isHovered && (
          <>
            {options
              .filter(
                (option) =>
                  !currentOptionInner || option.id !== currentOptionInner.id,
              )
              .map((option, index) => (
                <span
                  key={index}
                  className="mb-2 flex-0 opacity-60 transition-all duration-75
                    ease-out hover:scale-[1.2] hover:opacity-100"
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={(event) =>
                    handleOptionMouseEnter(event, option)
                  }
                  onMouseLeave={handleOptionMouseLeave}
                >
                  {option.icon}
                </span>
              ))}
            <div className="bg-brainstormyPrimary mb-2 h-px w-[120%]" />
          </>
        )}
        <span
          onMouseEnter={(event) => handleDefaultIconHover(event)}
          className="flex-0"
        >
          {currentOptionInner?.icon || defaultOption.icon}
        </span>
      </div>
      {tooltipState && (
        <Tooltip
          text={tooltipState.name}
          className="absolute text-nowrap"
          style={{
            left: 40,
            bottom: tooltipState.position.y,
          }}
        />
      )}
    </div>
  );
};
