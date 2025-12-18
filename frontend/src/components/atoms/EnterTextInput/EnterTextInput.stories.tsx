import type { Meta, StoryObj } from '@storybook/react-vite';

import { EnterTextInput } from './EnterTextInput';

const meta = {
  component: EnterTextInput,
} satisfies Meta<typeof EnterTextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialText: '',
    heading: 'Введите впомогательный промпт',
    placeholder: 'Введите промпт, который поможет генерировать идеи',
    onTextChange: () => {},
  },
};
