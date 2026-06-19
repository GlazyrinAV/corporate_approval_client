import { useDispatch, useSelector } from 'react-redux';
import { CompaniesList } from '../../../entities/company/companiesList/CompaniesList';
import styles from './Companies.module.css';
import type { AppDispatch } from '../../../app/store';
import { fetchCompanies, getCompanies, getIsLoading } from './companies-slice';
import { useEffect } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';

export const Companies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector(getCompanies);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <CompaniesList companies={companies} />
    </section>
  );
};
