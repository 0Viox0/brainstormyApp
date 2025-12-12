import type { Meta, StoryObj } from '@storybook/react-vite';

import { MethodPicker } from './MethodPicker';
import { MethologyDefaultIcon, ScamperLogo, SixHatsLogo } from '@/shared/icons';

const meta = {
  component: MethodPicker,
} satisfies Meta<typeof MethodPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOption: {
      id: -1,
      icon: <MethologyDefaultIcon />,
      name: 'Choose strategy',
    },
    options: [
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
    ],
    onOptionPick: () => {},
  },
};
