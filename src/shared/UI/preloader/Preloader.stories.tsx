import type { Meta, StoryObj } from '@storybook/react-vite';

import { Preloader } from './Preloader';

const meta: Meta<typeof Preloader> = {
  title: 'UI/Preloader',
  component: Preloader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof Preloader>;

export const Default: Story = {
  render: () => {
    return <Preloader />;
  }
};
