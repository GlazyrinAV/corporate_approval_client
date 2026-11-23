import type { Meta, StoryObj } from '@storybook/react-vite';

import { CommonCard } from './CommonCard';
import { CommonButton } from '../common-button/CommonButton';

const meta: Meta<typeof CommonCard> = {
  title: 'UI/CommonCard',
  component: CommonCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof CommonCard>;

export const Default: Story = {
  render: () => {
    return (
      <CommonCard
        title='New title'
        content={{
          data: [
            {
              fieldLabel: 'name',
              fieldValue: 'This Name'
            },
            {
              fieldLabel: 'content',
              fieldValue: 'This Content'
            }
          ]
        }}
      >
        <CommonButton onClick={() => {}}>More</CommonButton>
      </CommonCard>
    );
  }
};
