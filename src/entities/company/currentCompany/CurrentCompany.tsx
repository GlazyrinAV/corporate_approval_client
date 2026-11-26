import type { TCompany } from '../../../features/company/types/currentCompany';
import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import {
  COMPANY_TYPE,
  type CompanyTypeKey
} from '../../../shared/utils/companyTypes';

type CurrentCompanyProps = {
  currentCompany: TCompany;
};

export const CurrentCompany = ({ currentCompany }: CurrentCompanyProps) => {
  return (
    <CommonCard
      key={currentCompany?.id}
      title='Информация о компании'
      horizontal
      content={{
        data: [
          { fieldLabel: 'Наименование', fieldValue: currentCompany?.title },
          {
            fieldLabel: 'Вид компании',
            fieldValue:
              COMPANY_TYPE[currentCompany?.companyType as CompanyTypeKey] ??
              currentCompany?.companyType
          },
          {
            fieldLabel: 'ИНН',
            fieldValue: String(currentCompany?.inn)
          },
          {
            fieldLabel: 'ОГРН',
            fieldValue: String(currentCompany?.registrationNumber)
          },
          {
            fieldLabel: 'Совет директоров',
            fieldValue: currentCompany?.hasBoardOfDirectors
              ? 'Имеется'
              : 'Отсутствует'
          }
        ]
      }}
    />
  );
};
