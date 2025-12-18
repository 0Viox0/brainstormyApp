import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThreeWayLine } from './ThreeWayLine';

const meta = {
  component: ThreeWayLine,
} satisfies Meta<typeof ThreeWayLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
