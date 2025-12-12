import type { Meta, StoryObj } from '@storybook/react-vite';

import { PickerWithDefaultSetter } from './PickerWithDefaultSetter';

const meta = {
  component: PickerWithDefaultSetter,
} satisfies Meta<typeof PickerWithDefaultSetter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onOptionPick: () => {},
  },
};
