import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type TimePickerProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  errorMessage?: string;
  errorState?: boolean;
};

export const TimePickerBasic = ({
  label,
  value,
  onChange,
  errorMessage,
  errorState = false
}: TimePickerProps) => (
  <LocalizationProvider
    dateAdapter={AdapterDayjs}
    adapterLocale={dayjs.locale('ru')}
  >
    <TimePicker
      label={label}
      value={dayjs(value)}
      onChange={(date) => {
        onChange(date.toDate());
      }}
      slotProps={{
        textField: {
          error: errorState,
          helperText: errorMessage
        }
      }}
      ampm={false}
    />
  </LocalizationProvider>
);
