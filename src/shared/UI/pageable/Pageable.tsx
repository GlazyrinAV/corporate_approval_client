import Pagination from '@mui/material/Pagination';
import { useMemo } from 'react';

type PageableProps = {
  count: number;
  page: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'large' | 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'standard';
  variant?: 'text' | 'outlined';
  'aria-label'?: string;
};

export const Pageable = ({
  count,
  page,
  onChange,
  className,
  size = 'large',
  color,
  variant,
  'aria-label': ariaLabel = 'Навигация по страницам'
}: PageableProps) => {
  const label = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    return `Страница ${page} из ${count}`;
  }, [ariaLabel, page, count]);

  return (
    <Pagination
      count={count}
      page={page}
      onChange={(_event, value) => onChange(value)}
      className={className}
      size={size}
      aria-label={label}
      {...(color && { color })}
      {...(variant && { variant })}
    />
  );
};
