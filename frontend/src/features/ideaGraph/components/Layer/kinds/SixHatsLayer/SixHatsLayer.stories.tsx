import type { Meta, StoryObj } from '@storybook/react-vite';

import { SixHatsLayer } from './SixHatsLayer';

const meta = {
  title: 'features/ideagraph/kind/sixhats',
  component: SixHatsLayer,
} satisfies Meta<typeof SixHatsLayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    onGenerateIdea: () => {},
    data: {
      blue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      white:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      green:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      yellow:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      black:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      red: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onGenerateIdea: () => {},
    data: {
      blue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      white:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      green:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      yellow:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      black:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
      red: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci magnam veritatis earum eveniet atque?',
    },
  },
};
