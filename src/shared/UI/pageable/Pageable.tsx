import Pagination from '@mui/material/Pagination';

type PageableProps = {
  count: number;
  page: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'large' | 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'standard';
  variant?: 'text' | 'outlined';
};

export const Pageable = ({
  count,
  page,
  onChange,
  className,
  size = 'large',
  color,
  variant,
}: PageableProps) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={(_event, value) => onChange(value)}
      className={className}
      size={size}
      {...(color && { color })}
      {...(variant && { variant })}
    />
  );
};
