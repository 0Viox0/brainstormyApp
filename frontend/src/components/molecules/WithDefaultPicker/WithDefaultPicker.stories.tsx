import type { Meta, StoryObj } from '@storybook/react-vite';
import { WithDefaultPicker } from './WithDefaultPicker';

const meta = {
  component: WithDefaultPicker,
} satisfies Meta<typeof WithDefaultPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const MockPicker = ({ hasValue = false }) => (
  <div
    className="flex h-8 w-8 items-center justify-center rounded-full
      bg-gray-200"
  >
    {hasValue ? '' : ''}
  </div>
);

export const WithSelection: Story = {
  args: {
    pickedSomething: false,
    children: null,
    onDefaultPickerClick: () => console.log('Default picker clicked'),
  },
  render: (args) => (
    <WithDefaultPicker
      onDefaultPickerClick={args.onDefaultPickerClick}
      pickedSomething={args.pickedSomething}
    >
      <MockPicker hasValue={true} />
    </WithDefaultPicker>
  ),
};
