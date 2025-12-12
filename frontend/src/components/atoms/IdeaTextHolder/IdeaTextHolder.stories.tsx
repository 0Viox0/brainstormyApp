import type { Meta, StoryObj } from '@storybook/react-vite';

import { IdeaTextHolder } from './IdeaTextHolder';

const meta = {
  component: IdeaTextHolder,
} satisfies Meta<typeof IdeaTextHolder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'text',
  },
};

export const BigDefault: Story = {
  args: {
    text: 'some very long text that would probably not properly fit in the component and i keep going right now and still keep going and still going new hehe',
  },
};
