import { MethodPicker, WithDefaultPicker } from '@/components/molecules';
import type { PickOption } from '@/components/molecules/MethodPicker/MethodPicker';
import { MethologyDefaultIcon, ScamperLogo, SixHatsLogo } from '@/shared/icons';
import { useState, type FC } from 'react';

export type PickerWithDefaultSetterProps = {
  onOptionPick: (option: PickOption) => void;
};

export const PickerWithDefaultSetter: FC<PickerWithDefaultSetterProps> = ({
  onOptionPick,
}) => {
  const [currentOption, setCurrentOption] = useState<PickOption | undefined>(
    undefined,
  );

  const options = [
    {
      id: 2,
      icon: <ScamperLogo />,
      name: 'SCAMPER',
    },
    {
      id: 1,
      icon: <SixHatsLogo />,
      name: 'Six hats',
    },
  ];

  const defaultOption = {
    id: -1,
    icon: <MethologyDefaultIcon />,
    name: 'Choose strategy',
  };

  const handleOptionPick = (option: PickOption) => {
    setCurrentOption(option);
    onOptionPick(option);
  };

  const handleSetDefaultOption = () => {
    setCurrentOption(options.find((option) => option.id === 1));
  };

  return (
    <WithDefaultPicker
      pickedSomething={Boolean(currentOption)}
      onDefaultPickerClick={handleSetDefaultOption}
    >
      <MethodPicker
        currentOption={currentOption}
        defaultOption={defaultOption}
        options={options}
        onOptionPick={handleOptionPick}
      />
    </WithDefaultPicker>
  );
};
