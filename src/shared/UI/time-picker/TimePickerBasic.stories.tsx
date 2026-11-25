import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { TimePickerBasic } from './TimePickerBasic';

const meta: Meta<typeof TimePickerBasic> = {
  title: 'UI/TimePickerBasic',
  component: TimePickerBasic,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    position: 'center'
  }
};

export default meta;

type Story = StoryObj<typeof TimePickerBasic>;

export const Default: Story = {
  render: () => {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={dayjs.locale('ru')}
      >
        <TimePickerBasic label='Тест' value={new Date()} onChange={() => {}} />
      </LocalizationProvider>
    );
  }
};
