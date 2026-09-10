import type { Meta, StoryObj } from '@storybook/react-vite';
import { BasicTable } from './Table';

const meta: Meta<typeof BasicTable> = {
  title: 'UI/Table',
  component: BasicTable,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof BasicTable>;

export const Basic: Story = {
  args: {
    headers: [
      { colName: 'name', colValue: 'Наименование' },
      { colName: 'share', colValue: 'Доля' }
    ],
    rawData: [
      { name: 'Frozen yoghurt', share: 159 },
      { name: 'Frozen yoghurt', share: 259 },
      { name: 'Frozen yoghurt' },
      { name: 'Frozen yoghurt', share: 259, add: 'лишняя информация' }
    ]
  }
};
