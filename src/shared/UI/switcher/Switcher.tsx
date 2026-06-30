import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export type SwitcherProps = {
  label?: string;
  disabled?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'default';
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
};

export const Switcher = ({
  label,
  disabled = false,
  color = 'primary',
  value = false,
  onChange,
  defaultChecked
}: SwitcherProps) => {
  return (
    <FormControlLabel
      labelPlacement='start'
      control={
        <Switch
          color={color}
          onChange={onChange}
          disabled={disabled}
          checked={value}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
      sx={{
        justifyContent: 'flex-end',
        marginLeft: '0'
      }}
    />
  );
};
