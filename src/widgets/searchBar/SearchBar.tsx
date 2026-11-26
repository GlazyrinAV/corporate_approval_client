import { FormInput } from '../../shared/ui/input/FormInput';
import { useCallback, useState } from 'react';
import { useDebounce } from '../../shared/utils/hooks/useDebounce';
import style from './SearchBar.module.css';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { Search } from '../../shared/assets/icons';

type SearchBarProps = {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  debounceValue?: number;
  queryValue: string;
};

export const SearchBar = ({
  onSearch,
  onClear,
  placeholder = 'Найти по названию или инн',
  debounceValue = 300,
  queryValue
}: SearchBarProps) => {
  const [query, setQuery] = useState(queryValue ? queryValue : '');
  const { debounce } = useDebounce(debounceValue);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      debounce(() => {
        if (onSearch || value.trim()) {
          onSearch?.(value);
        }
      });
    },
    [debounce, onSearch]
  );

  return (
    <div className={style.wrapper}>
      <FormInput
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        type='text'
        className={style.container}
        sx={{
          '& .MuiInputBase-input': {
            paddingLeft: '45px'
          }
        }}
      />
      <Search className={style.icon} color='rgba(0, 0, 0, 0.25)'/>
      {query.trim() ? (
        <div className={style.actionButton}>
          <CommonButton
            variant='text'
            onClick={() => {
              onClear();
              setQuery('');
            }}
          >
            Очистить
          </CommonButton>
        </div>
      ) : null}
    </div>
  );
};
