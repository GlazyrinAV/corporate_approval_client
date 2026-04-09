import { useNavigate } from 'react-router';
import { EditCompanyForm } from '../../../entities/company/companyEditForm/CompanyEditForm';
import styles from './EditCompany.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import type { TCompany } from '../types/currentCompany';

type EditCompanyProps = {
  currentCompany?: TCompany;
  onSubmit?: (company: TCompany) => void;
};

export const EditCompany = ({ currentCompany, onSubmit }: EditCompanyProps) => {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.actions}>
        <CommonButton onClick={() => navigate(-1)}>Back</CommonButton>
      </div>
      <div className={styles.content}>
        <EditCompanyForm currentCompany={currentCompany} onSubmit={onSubmit} />
      </div>
    </section>
  );
};
