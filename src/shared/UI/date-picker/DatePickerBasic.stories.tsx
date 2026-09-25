import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePickerBasic } from './DatePickerBasic';

const meta: Meta<typeof DatePickerBasic> = {
  title: 'UI/DatePickerBasic',
  component: DatePickerBasic,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof DatePickerBasic>;

export const Default: Story = {
  render: () => {
    return (
      <DatePickerBasic label='Тест' value={new Date()} onChange={() => {}} />
    );
  }
};
