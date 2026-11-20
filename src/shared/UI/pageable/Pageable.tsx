import Pagination from '@mui/material/Pagination';

type PageableProps = {
  count: number;
  page: number;
  onChange: (value: number) => void;
  classname?: string;
  size?: 'large' | 'small' | 'medium';
};

export const Pageable = ({
  count,
  page,
  onChange,
  classname,
  size = 'large'
}: PageableProps) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={(event: React.ChangeEvent<unknown, Element>, value: number) => {
        event.preventDefault();
        onChange(value);
      }}
      className={classname}
      size={size}
    />
  );
};
