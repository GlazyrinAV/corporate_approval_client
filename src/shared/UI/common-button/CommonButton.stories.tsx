import type { Meta, StoryObj } from '@storybook/react-vite';

import { CommonButton } from './CommonButton';

const meta: Meta<typeof CommonButton> = {
  title: 'UI/Button',
  component: CommonButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof CommonButton>;

export const Default: Story = {
  render: () => {
    return <CommonButton>Default</CommonButton>;
  }
};

export const Contained: Story = {
  render: () => {
    return (
      <CommonButton variant='contained' color='primary'>
        Default
      </CommonButton>
    );
  }
};

export const Outline: Story = {
  render: () => {
    return (
      <CommonButton variant='outlined' color='primary'>
        Default
      </CommonButton>
    );
  }
};

export const Text: Story = {
  render: () => {
    return (
      <CommonButton variant='text' color='primary'>
        Default
      </CommonButton>
    );
  }
};
