import { COMPANY_TYPE } from '../../../shared/utils/companyTypes';
import styles from './CompaniesList.module.css';
import { Link, useNavigate } from 'react-router';
import { routeBuilders } from '../../../app/routes';
import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import type { TCompany } from '../../../features/company/types/currentCompany';

type CompaniesListProps = {
  companies: TCompany[];
};

export const CompaniesList = ({ companies }: CompaniesListProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.companies_list}>
      {companies
        ? companies.map((company, index) => (
            <Link
              to={routeBuilders.currentCompany({ companyId: company?.id })}
              key={index}
            >
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
                    navigate(
                      routeBuilders.currentCompany({ companyId: company.id })
                    );
                  }}
                  className={styles.button}
                >
                  Подробнее
                </CommonButton>
              </CommonCard>
            </Link>
          ))
        : 'Компании не найдены'}
    </div>
  );
};
