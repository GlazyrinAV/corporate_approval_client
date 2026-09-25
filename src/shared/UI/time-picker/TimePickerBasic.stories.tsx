import type { Meta, StoryObj } from '@storybook/react-vite';

import { TimePickerBasic } from './TimePickerBasic';

const meta: Meta<typeof TimePickerBasic> = {
  title: 'UI/TimePickerBasic',
  component: TimePickerBasic,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof TimePickerBasic>;

export const Default: Story = {
  render: () => {
    return (
      <TimePickerBasic label='Тест' value={new Date()} onChange={() => {}} />
    );
  }
};
