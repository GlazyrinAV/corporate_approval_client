import { forwardRef } from 'react';
import type { SxProps, Theme } from '@mui/system';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';

type FormInputProps = Omit<TextFieldProps, 'slotProps'> & {
  helpText?: string;
  sx?: SxProps<Theme>;
};

export const FormInput = forwardRef<
  HTMLDivElement,
  FormInputProps
>(({ helpText, color = 'primary', ...props }, ref) => {
  return (
    <TextField
      ref={ref}
      variant='outlined'
      color={color}
      helperText={helpText ?? props.helperText ?? null}
      {...props}
    />
  );
});

FormInput.displayName = 'FormInput';
