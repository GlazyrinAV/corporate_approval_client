import { FormInput } from '../../shared/ui/input/FormInput';
import { useCallback, useState } from 'react';
import { useDebounce } from '../../shared/utils/hooks/useDebounce';
import style from './SearchBar.module.css';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';

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
    <div>
      <FormInput
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        type='text'
        classname={style.container}
      />
      {query.trim() ? (
        <CommonButton
          variant='text'
          onClick={() => {
            onClear();
            setQuery('');
          }}
          className={style.clear}
        >
          Очистить
        </CommonButton>
      ) : null}
    </div>
  );
};
