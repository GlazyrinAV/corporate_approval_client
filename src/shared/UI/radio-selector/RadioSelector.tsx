import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export type TRadioSelectorOption = {
  value: string;
  label: string;
  disabled?: boolean;
  color?: string;
};

type TRadioGroupProps = {
  id: string;
  label?: string;
  options: TRadioSelectorOption[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  row?: boolean;
  error?: boolean;
};

export const RadioSelector = ({
  id,
  label,
  options,
  onChange,
  defaultValue,
  row = false,
  error = false
}: TRadioGroupProps) => {
  return (
    <FormControl error={error}>
      <FormLabel id={`${id}-label`}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${id}-label`}
        defaultValue={defaultValue}
        name='radio-buttons-group'
        row={row}
        onChange={onChange}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled}
            key={option.value}
            color={option.color}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
