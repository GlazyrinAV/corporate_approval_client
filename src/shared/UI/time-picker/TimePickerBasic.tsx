import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export type TimePickerBasicProps = {
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
}: TimePickerBasicProps) => (
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
);
