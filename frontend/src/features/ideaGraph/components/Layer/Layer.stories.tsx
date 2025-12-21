import type { Meta, StoryObj } from '@storybook/react-vite';

import { Layer } from './Layer';

const meta = {
  title: 'features/ideagraph/layer',
  component: Layer,
} satisfies Meta<typeof Layer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SixHatsLayer: Story = {
  args: {
    triggerGenerateNewLayer: () => {},
    layerData: {
      method: 'sixHats',
      helpingPrompt: 'hehe haha',
      baseIdea: 'летающие лодки, которые помогают кошкам добраться до врачей',
    },
  },
};

export const ScamperLayer: Story = {
  args: {
    triggerGenerateNewLayer: () => {},
    layerData: {
      method: 'scamper',
      helpingPrompt: 'hehe haha',
      baseIdea: 'летающие лодки, которые помогают кошкам добраться до врачей',
    },
  },
};
