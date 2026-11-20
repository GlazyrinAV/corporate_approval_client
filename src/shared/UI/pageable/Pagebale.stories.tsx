import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pageable } from './Pageable';

const meta: Meta<typeof Pageable> = {
  title: 'UI/Pagebale',
  component: Pageable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof Pageable>;

export const Default: Story = {
  render: () => {
    return <Pageable count={10} page={3} onChange={() => {}} />;
  }
};
