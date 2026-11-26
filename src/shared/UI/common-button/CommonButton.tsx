import { forwardRef } from 'react';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';

type CommonButtonProps = ButtonProps & {
  loading?: boolean;
};

export const CommonButton = forwardRef<
  HTMLButtonElement,
  CommonButtonProps
>(
  (
    {
      variant = 'contained',
      disabled = false,
      color = 'primary',
      loading = false,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        disabled={disabled || loading}
        color={color}
        loading={loading}
        {...props}
      />
    );
  }
);

CommonButton.displayName = 'CommonButton';
