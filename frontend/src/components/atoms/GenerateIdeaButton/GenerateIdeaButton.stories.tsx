import type { Meta, StoryObj } from '@storybook/react-vite';

import { GenerateIdeaButton } from './GenerateIdeaButton';

const meta = {
  component: GenerateIdeaButton,
} satisfies Meta<typeof GenerateIdeaButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
