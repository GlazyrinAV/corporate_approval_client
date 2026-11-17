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
    tableData: [
      {
        id: 1,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 2,
        rowData: [
          { cellLabel: 'name', cellValue: 'UnFrozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 3,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 4,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 },
        ]
      },
    ]
  }
};

export const SneekPeak: Story = {
  args: {
    disableView: true,
    sneakPeek: 2,
    tableData: [
      {
        id: 1,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 2,
        rowData: [
          { cellLabel: 'name', cellValue: 'UnFrozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 3,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 4,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 },
        ]
      },
    ]
  }
};

export const AdditionalColumn: Story = {
  args: {
    isHeadersVisible: false,
    emptyDataMessage: 'Х',
    tableData: [
      {
        id: 1,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 2,
        rowData: [
          { cellLabel: 'name', cellValue: 'UnFrozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 3,
        rowData: [
          { cellLabel: 'name', cellValue: 'UnFrozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 },
          { cellLabel: 'X', cellValue: 100 },
        ]
      },
      {
        id: 4,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 }
        ]
      },
      {
        id: 5,
        rowData: [
          { cellLabel: 'name', cellValue: 'Frozen yoghurt' },
          { cellLabel: 'share', cellValue: 159 },
        ]
      },
    ]
  }
};