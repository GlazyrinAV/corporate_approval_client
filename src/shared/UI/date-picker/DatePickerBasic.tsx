import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export type DatePickerBasicProps = {
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
}: DatePickerBasicProps) => {
  return (
    <DatePicker
      label={label}
      value={dayjs(value)}
      onChange={(date) => onChange(date.toDate())}
      disableFuture={disableFuture}
      disablePast={disablePast}
      format='DD/MM/YYYY'
      slotProps={{
        textField: {
          error: errorState,
          helperText: errorMessage
        }
      }}
    />
  );
};
