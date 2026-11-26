import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switcher } from './Switcher';
import { useState } from 'react';

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
    const [on, setOn] = useState(false);
    return (
      <Switcher
        id={'1'}
        label='Choose'
        value={on}
        onChange={(event) => {
          setOn(event.target.checked);
        }}
      />
    );
  }
};
