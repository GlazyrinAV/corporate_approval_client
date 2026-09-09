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
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import { SearchBar } from '../../../widgets/searchBar/SearchBar';

export const CompaniesInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companiesPagebale = useSelector(getCompanies);
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(
    companiesPagebale ? companiesPagebale.number : 1
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
      ) : companiesPagebale ? (
        <section className={styles.container}>
          <CompaniesList companies={companiesPagebale.content} />
          {companiesPagebale.totalPages > 1 ? (
            <Pagebale
              count={companiesPagebale.totalPages}
              page={page}
              onChange={handlePageChange}
              classname={styles.pagebale}
            />
          ) : null}
        </section>
      ) : (
        'Компании не найдены'
      )}
    </div>
  );
};
