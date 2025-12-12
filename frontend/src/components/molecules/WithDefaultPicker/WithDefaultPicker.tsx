import { useState, type FC, type ReactNode } from 'react';
import { SetDefaultOptionIcon } from '@/shared/icons';
import { Dot, Tooltip } from '@/components/atoms';

export type WithDefaultPickerProps = {
  pickedSomething: boolean;
  children: ReactNode;
  onDefaultPickerClick: () => void;
};

export const WithDefaultPicker: FC<WithDefaultPickerProps> = ({
  pickedSomething,
  onDefaultPickerClick,
  children,
}) => {
  const [isDefaultPickerButtonHovered, setIsDefaultPickerButtonHovered] =
    useState(false);

  return (
    <div className="flex items-end">
      {children}
      {!pickedSomething && (
        <div className="z-10 -ml-1 flex items-center justify-start">
          <Dot color="red" />
          <div
            className="border-t-brainstormySecondary w-6 border-t-[2px]
              border-dashed"
          ></div>
          <div className="relative">
            <div
              className="bg-brainstormySecondary flex h-8 w-8 items-center
                justify-center rounded-full transition-all duration-100
                ease-in-out hover:scale-[1.1] hover:cursor-pointer"
              onMouseEnter={() => setIsDefaultPickerButtonHovered(true)}
              onMouseLeave={() => setIsDefaultPickerButtonHovered(false)}
              onClick={onDefaultPickerClick}
            >
              <SetDefaultOptionIcon />
            </div>
            {isDefaultPickerButtonHovered && (
              <Tooltip
                text="Set default value"
                className="absolute top-1/2 left-[130%] -translate-y-1/2
                  text-nowrap"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
