import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormInput } from './FormInput';

const meta: Meta<typeof FormInput> = {
  title: 'UI/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  render: () => {
    return <FormInput placeholder='Input here' />;
  }
};

export const Standard: Story = {
  render: () => {
    return <FormInput placeholder='Input here' variant='standard' />;
  }
};

export const Filled: Story = {
  render: () => {
    return <FormInput placeholder='Input here' variant='filled' />;
  }
};

export const Outlined: Story = {
  render: () => {
    return <FormInput placeholder='Input here' variant='outlined' />;
  }
};
