import type { Meta, StoryObj } from '@storybook/react-vite';

import { PromptPickerWithDefaultSetter } from './PromptPickerWithDefaultSetter';

const meta = {
  component: PromptPickerWithDefaultSetter,
} satisfies Meta<typeof PromptPickerWithDefaultSetter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
