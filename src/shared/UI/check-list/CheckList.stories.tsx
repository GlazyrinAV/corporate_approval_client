import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckList } from './CheckList';

const meta: Meta<typeof CheckList> = {
  title: 'UI/CheckList',
  component: CheckList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof CheckList>;

export const Default: Story = {
  render: () => {
    return (
      <CheckList
        values={[
          { id: 1, name: 'checked', checked: true },
          {
            id: 2,
            name: 'unchecked',
            checked: false,
            newValue: 'la-la'
          }
        ]}
        fields={['name', 'newValue']}
      />
    );
  }
};
