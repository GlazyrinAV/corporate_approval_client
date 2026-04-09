import TextField from '@mui/material/TextField';

type FormInputProps = {
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  error?: boolean;
  helpText?: string;
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';
  placeholder?: string;
  value?: string;
};

export const FormInput = ({
  label,
  variant = 'outlined',
  onChange,
  required = false,
  disabled = false,
  type = 'text',
  error = false,
  helpText,
  color = 'primary',
  placeholder,
  value
}: FormInputProps) => {
  return (
    <TextField
      label={label}
      variant={variant}
      onChange={onChange}
      required={required}
      disabled={disabled}
      type={type}
      error={error}
      helperText={helpText}
      color={color}
      placeholder={placeholder}
      value={value}
    />
  );
};
