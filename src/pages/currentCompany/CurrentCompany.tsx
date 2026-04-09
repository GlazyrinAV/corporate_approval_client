import { useNavigate, useParams } from 'react-router';
import { Company } from '../../features/company/getCompany/Company';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import styles from './CurrentCompany.module.css';
import { routes } from '../../app/routes';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { removeCompany } from '../../features/company/getCompany/currentCompany-slice';
import { getCompaniesApi } from '../../features/company/api/getCompanyApi';

export const CurrentCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();

  const handleDelete = () => {
    dispatch(removeCompany(Number(params.id)));
    dispatch(getCompaniesApi);
    navigate(routes.main);
  };

  return (
    <section className={styles.container}>
      <div className={styles.navigation}>
        <CommonButton onClick={() => navigate(routes.main)}>Back</CommonButton>
      </div>
      <Company />
      <div className={styles.actions}>
        <CommonButton
          color='secondary'
          onClick={() => navigate(`/company/${params.id}/edit`)}
        >
          Edit Company
        </CommonButton>
        <CommonButton color='error' onClick={handleDelete}>
          Delete Company
        </CommonButton>
      </div>
    </section>
  );
};
