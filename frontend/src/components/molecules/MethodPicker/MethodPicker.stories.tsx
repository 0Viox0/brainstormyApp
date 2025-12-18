import type { Meta, StoryObj } from '@storybook/react-vite';

import { MethodPicker } from './MethodPicker';
import { ScamperLogo, SixHatsLogo } from '@/shared/icons';

const meta = {
  component: MethodPicker,
} satisfies Meta<typeof MethodPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOptionId: 1,
    options: [
      {
        id: 2,
        icon: <ScamperLogo />,
        name: 'Скампер',
        type: 'scamper',
      },
      {
        id: 1,
        icon: <SixHatsLogo />,
        name: 'Шесть шляп',
        type: 'sixHats',
      },
    ],
    onOptionPick: () => {},
  },
};
