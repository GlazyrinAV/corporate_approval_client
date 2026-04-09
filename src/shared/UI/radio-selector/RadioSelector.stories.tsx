import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioSelector, type TRadioSelectorOption } from './RadioSelector';

const meta: Meta<typeof RadioSelector> = {
  title: 'UI/RadioSelector',
  component: RadioSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof RadioSelector>;

const options: TRadioSelectorOption[] = [
  {
    value: '1',
    label: 'Option 1'
  },
  {
    value: '2',
    label: 'Option 2'
  }
];

export const Default: Story = {
  render: () => {
    return (
      <RadioSelector id='id' options={options} label='Select option' row />
    );
  }
};
