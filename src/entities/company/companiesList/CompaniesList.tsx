import {
  fetchCompanies,
  getCompanies,
  getIsLoading
} from '../../../features/company/getAll/companies-slice';
import { useEffect } from 'react';

import { COMPANY_TYPE } from '../../../shared/utils/companyTypes';
import styles from './CompaniesList.module.css';
import { Link, useNavigate } from 'react-router';
import { routes } from '../../../app/routes';
import { useDispatch, useSelector } from '../../../app/store';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';

export const CompaniesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector(getCompanies);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className={styles.companies_list}>
      {companies
        ? companies.map((company, index) => (
            <Link to={`${routes.company}/${company.id}`} key={index}>
              <CommonCard
                key={company.id}
                title='Информация о компании'
                content={{
                  Наименование: company.title,
                  'Вид компании': COMPANY_TYPE[company.companyType],
                  ИНН: String(company.inn),
                  ОГРН: String(company.registrationNumber)
                }}
              >
                <CommonButton
                  onClick={() => {
                    navigate(`${routes.company}/${company.id}`);
                  }}
                  className={styles.button}
                >
                  Подробнее
                </CommonButton>
              </CommonCard>
            </Link>
          ))
        : ''}
    </div>
  );
};
