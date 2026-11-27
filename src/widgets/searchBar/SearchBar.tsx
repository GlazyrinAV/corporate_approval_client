import { useCallback } from 'react';
import { FormInput } from '../../shared/ui/input/FormInput';
import style from './SearchBar.module.css';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { Search } from '../../shared/assets/icons';

type SearchBarProps = {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  queryValue: string;
};

const PLACEHOLDERS = {
  DEFAULT: 'Найти по названию или инн'
} as const;

export const SearchBar = ({
  onSearch,
  onClear,
  placeholder = PLACEHOLDERS.DEFAULT,
  queryValue
}: SearchBarProps) => {
  const handleChange = useCallback(
    (value: string) => {
      onSearch?.(value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    onClear?.();
  }, [onClear]);

  return (
    <div className={style.wrapper}>
      <FormInput
        placeholder={placeholder}
        value={queryValue}
        onChange={(e) => handleChange(e.target.value)}
        type='text'
        className={style.container}
        sx={{
          '& .MuiInputBase-input': {
            paddingLeft: '45px'
          }
        }}
      />
      <Search className={style.icon} color='rgba(0, 0, 0, 0.25)' />
      {queryValue.trim() ? (
        <div className={style.actionButton}>
          <CommonButton variant='text' onClick={handleClear}>
            Очистить
          </CommonButton>
        </div>
      ) : null}
    </div>
  );
};
