import type { Meta, StoryObj } from '@storybook/react-vite';

import { LayerLoader } from './LayerLoader';

const meta = {
  component: LayerLoader,
  title: 'features/ideagraph/layerloader',
} satisfies Meta<typeof LayerLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ideasCount: 6,
    mountPointAgainstIdeaNumber: 2,
  },
};
