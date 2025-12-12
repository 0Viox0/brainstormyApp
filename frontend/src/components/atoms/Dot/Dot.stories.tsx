import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dot } from './Dot';

const meta = {
  component: Dot,
} satisfies Meta<typeof Dot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Green: Story = {
  args: {
    color: 'green',
  },
};

export const Red: Story = {
  args: {
    color: 'red',
  },
};
