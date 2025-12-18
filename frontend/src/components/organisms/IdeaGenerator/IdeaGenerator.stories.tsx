import type { Meta, StoryObj } from '@storybook/react-vite';

import { IdeaGenerator } from './IdeaGenerator';
import type { HTMLAttributes } from 'react';

const storyDecoratorStyles: HTMLAttributes<HTMLDivElement>['style'] = {
  position: 'absolute',
  top: '300px',
  left: '50%',
  transform: 'translateX(-50%)',
};

const meta = {
  component: IdeaGenerator,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={storyDecoratorStyles}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IdeaGenerator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onGenerate: () => {},
  },
};

export const First: Story = {
  args: {
    isFirstIdea: true,
    onGenerate: () => {},
  },
};
