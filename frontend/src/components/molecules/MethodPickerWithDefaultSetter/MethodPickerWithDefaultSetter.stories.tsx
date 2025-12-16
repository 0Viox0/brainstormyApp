import type { Meta, StoryObj } from '@storybook/react-vite';

import { MethodPickerWithDefaultSetter } from './MethodPickerWithDefaultSetter';

const meta = {
  component: MethodPickerWithDefaultSetter,
} satisfies Meta<typeof MethodPickerWithDefaultSetter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onOptionPick: () => {},
  },
};
