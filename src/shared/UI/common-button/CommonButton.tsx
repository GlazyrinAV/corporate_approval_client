import Button from '@mui/material/Button';
import type { SyntheticEvent } from 'react';

type CommonButtonProps = {
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  children: React.ReactNode;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'inherit'
    | 'success'
    | 'info'
    | 'warning';
  onClick?: (e: SyntheticEvent) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
};

export const CommonButton = ({
  variant = 'contained',
  disabled = false,
  children,
  color = 'primary',
  onClick,
  startIcon,
  endIcon,
  loading = false,
  className
}: CommonButtonProps) => {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      loading={loading}
      className={className}
    >
      {children}
    </Button>
  );
};
