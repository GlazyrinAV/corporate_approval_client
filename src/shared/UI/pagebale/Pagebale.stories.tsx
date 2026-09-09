import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagebale } from './Pagebale';

const meta: Meta<typeof Pagebale> = {
  title: 'UI/Pagebale',
  component: Pagebale,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof Pagebale>;

export const Default: Story = {
  render: () => {
    return <Pagebale count={10} page={3} onChange={() => {}} />;
  }
};
