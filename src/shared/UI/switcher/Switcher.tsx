import type { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export type SwitcherProps = {
  id?: string;
  label?: string;
  disabled?: boolean;
  color?: SwitchProps['color'];
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
};

export const Switcher = ({
  id,
  label,
  disabled = false,
  color = 'primary',
  value,
  onChange,
  defaultChecked
}: SwitcherProps) => {
  return (
    <FormControlLabel
      control={
        <Switch
          id={id}
          name={id}
          color={color}
          checked={value}
          onChange={onChange}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
      labelPlacement='end'
      sx={{
        justifyContent: 'flex-end',
        gap: 1
      }}
    />
  );
};
