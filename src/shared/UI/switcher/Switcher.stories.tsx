import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switcher } from './Switcher';

const meta: Meta<typeof Switcher> = {
  title: 'UI/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof Switcher>;

export const Default: Story = {
  render: () => {
    return <Switcher label='Choose' value='YES'  />;
  }
};
