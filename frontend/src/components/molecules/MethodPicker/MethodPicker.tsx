import { Tooltip } from '@/components/atoms';
import type { Method } from '@/features/ideaGraph/store/state';
import { useState, type FC, type MouseEvent, type ReactNode } from 'react';

export type PickOption = {
  id: number;
  name: string;
  icon: ReactNode;
  type: Method;
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
  defaultOptionId: number;
  options: PickOption[];
  onOptionPick: (option: number) => void;
};

const APPROXIMATE_ITEM_HEIGHT = 32; // px

export const MethodPicker: FC<PickerProps> = ({
  onOptionPick,
  options,
  defaultOptionId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentOptionId, setCurrentOptionId] = useState(defaultOptionId);
  const [tooltipState, setTooltipState] = useState<ToolTipState | null>(null);

  const calculateHeight = () => APPROXIMATE_ITEM_HEIGHT * options.length + 4;

  const handleOptionClick = (option: PickOption) => {
    setCurrentOptionId(option.id);
    setIsHovered(false);

    onOptionPick(option.id);
  };

  const handlePickerMouseLeave = () => {
    setIsHovered(false);
    handleOptionMouseLeave();
  };

  const handleOptionMouseEnter = (
    event: MouseEvent<HTMLSpanElement>,
    option: PickOption,
  ) => {
    setIsHovered(true);

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

  const handleOptionMouseLeave = () => {
    setTooltipState(null);
  };

  const getCurrentOption = () =>
    options.find((option) => option.id === currentOptionId) || options[0];

  return (
    <div className="relative w-8">
      <div
        className="bg-brainstormySecondary absolute right-0 bottom-0 flex w-8
          origin-bottom flex-col items-center justify-end overflow-hidden
          rounded-[37px] p-2 transition-all duration-[0.2s] ease-in-out
          hover:cursor-pointer"
        onMouseLeave={handlePickerMouseLeave}
        style={{
          height: `${!isHovered ? 32 : calculateHeight()}px`,
        }}
      >
        {isHovered && (
          <>
            {options
              .filter((option) => option.id !== currentOptionId)
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
          onMouseEnter={(event) =>
            handleOptionMouseEnter(event, getCurrentOption())
          }
          className="flex-0"
        >
          {getCurrentOption().icon}
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
