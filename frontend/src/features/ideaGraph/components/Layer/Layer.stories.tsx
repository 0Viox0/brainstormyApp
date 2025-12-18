import type { Meta, StoryObj } from '@storybook/react-vite';

import { Layer } from './Layer';

const meta = {
  component: Layer,
} satisfies Meta<typeof Layer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerGenerateNewLayer: () => {},
    layerData: {
      method: 'sixHats',
      helpingPrompt: 'hehe haha',
      baseIdea: 'летающие лодки, которые помогают кошкам добраться до врачей',
    },
  },
};
