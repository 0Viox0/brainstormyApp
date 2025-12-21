import type { Meta, StoryObj } from '@storybook/react-vite';

import { IdeaGeneratorLoader } from './IdeaGeneratorLoader';

const meta = {
  title: 'features/ideagraph/ideageneratorloader',
  component: IdeaGeneratorLoader,
} satisfies Meta<typeof IdeaGeneratorLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
