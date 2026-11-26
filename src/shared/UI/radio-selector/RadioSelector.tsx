import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export type TRadioSelectorOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TRadioGroupProps = {
  id: string;
  label?: string;
  options: TRadioSelectorOption[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  row?: boolean;
  error?: boolean;
  helpText?: string;
};

export const RadioSelector = ({
  id,
  label,
  options,
  onChange,
  row = false,
  error = false,
  value,
  helpText
}: TRadioGroupProps) => {
  return (
    <FormControl error={error}>
      {label && <FormLabel id={`${id}-label`}>{label}</FormLabel>}
      <RadioGroup
        aria-labelledby={`${id}-label`}
        name={`${id}-group`}
        row={row}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled}
            key={option.value}
          />
        ))}
      </RadioGroup>
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};
