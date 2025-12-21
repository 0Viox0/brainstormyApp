import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScamperLayer } from './ScamperLayer';

const meta = {
  title: 'features/ideagraph/kind/scamper',
  component: ScamperLayer,
} satisfies Meta<typeof ScamperLayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onGenerateIdea: () => {},
    data: {
      s: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
      c: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
      a: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
      m: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
      p: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
      e: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
      r: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum non maxime suscipit voluptatum cupiditate illo.',
    },
  },
};
