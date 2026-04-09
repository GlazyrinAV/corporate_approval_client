import { CompaniesList } from '../../../entities/company/companiesList/CompaniesList';
import styles from './Companies.module.css';

export const Companies = () => {
  return (
    <section className={styles.container}>
      <CompaniesList />
    </section>
  );
};
