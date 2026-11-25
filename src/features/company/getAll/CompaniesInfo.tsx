import { useDispatch, useSelector } from 'react-redux';
import { CompaniesList } from '../../../entities/company/companiesList/CompaniesList';
import styles from './Companies.module.css';
import type { AppDispatch } from '../../../app/store';
import {
  fetchCompanies,
  filterCompanies,
  getCompanies,
  getIsLoading
} from './companies-slice';
import { useEffect, useState } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { Pageable } from '../../../shared/ui/pageable/Pageable';
import { SearchBar } from '../../../widgets/searchBar/SearchBar';

export const CompaniesInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companiesPageable = useSelector(getCompanies);
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(
    companiesPageable ? companiesPageable.number + 1 : 1
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      dispatch(filterCompanies({ query: searchQuery, page: page }));
    } else {
      dispatch(fetchCompanies(page));
    }
  }, [dispatch, searchQuery, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <SearchBar
          onSearch={handleSearch}
          onClear={() => {
            setSearchQuery('');
            setPage(1);
          }}
          queryValue={searchQuery}
        />
      </div>
      {isLoading ? (
        <Preloader />
      ) : companiesPageable ? (
        <section className={styles.container}>
          <CompaniesList companies={companiesPageable.content} />
          {companiesPageable.totalPages > 1 ? (
            <Pageable
              count={companiesPageable.totalPages}
              page={page}
              onChange={handlePageChange}
              classname={styles.pageable}
            />
          ) : null}
        </section>
      ) : (
        'Компании не найдены'
      )}
    </div>
  );
};
