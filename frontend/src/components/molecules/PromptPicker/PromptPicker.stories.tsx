import type { Meta, StoryObj } from '@storybook/react-vite';

import { PromptPicker } from './PromptPicker';
import { TextDefaultIcon } from '@/shared/icons';

const meta = {
  component: PromptPicker,
} satisfies Meta<typeof PromptPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hoverText: 'Вспомогательный промпт',
    onTextEnter: () => {},
    icon: <TextDefaultIcon />,
  },
};
