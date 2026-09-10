import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type DatePickerProps = {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  disableFuture?: boolean;
  disablePast?: boolean;
  errorMessage?: string;
  errorState?: boolean;
};

export const DatePickerBasic = ({
  label,
  value,
  onChange,
  disableFuture = false,
  disablePast = false,
  errorMessage,
  errorState = false
}: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DatePicker
        label={label}
        value={dayjs(value)}
        onChange={(date) => onChange(date.toDate())}
        disableFuture={disableFuture}
        disablePast={disablePast}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            error: errorState,
            helperText: errorMessage
          }
        }}
      />
    </LocalizationProvider>
  );
};
