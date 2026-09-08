import { useDispatch, useSelector } from 'react-redux';
import { CompaniesList } from '../../../entities/company/companiesList/CompaniesList';
import styles from './Companies.module.css';
import type { AppDispatch } from '../../../app/store';
import { fetchCompanies, getCompanies, getIsLoading } from './companies-slice';
import { useEffect, useState } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';

export const CompaniesInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companiesPagebale = useSelector(getCompanies);
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCompanies(null));
  }, [dispatch]);

  const handlePageChange = (value) => {
    dispatch(fetchCompanies(value));
    setPage(value);
  };

  return isLoading ? (
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
  );
};
