import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { DatePickerBasic } from './DatePickerBasic';

const meta: Meta<typeof DatePickerBasic> = {
  title: 'UI/DatePickerBasic',
  component: DatePickerBasic,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof DatePickerBasic>;

export const Default: Story = {
  render: () => {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={dayjs.locale('ru')}
      >
        <DatePickerBasic label='Тест' value={new Date()} onChange={() => {}} />
      </LocalizationProvider>
    );
  }
};
