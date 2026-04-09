import type { TCompany } from '../../../features/company/types/currentCompany';
import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import { COMPANY_TYPE } from '../../../shared/utils/companyTypes';

type CurrentCompanyProps = {
  currentCompany: TCompany;
};

export const CurrentCompany = ({ currentCompany }: CurrentCompanyProps) => {
  return (
    <CommonCard
      key={currentCompany?.id}
      title='Информация о компании'
      row
      content={{
        Наименование: currentCompany?.title,
        'Вид компании': COMPANY_TYPE[currentCompany?.companyType],
        ИНН: String(currentCompany?.inn),
        ОГРН: String(currentCompany?.registrationNumber),
        'Совет директоров': currentCompany?.hasBoardOfDirectors
          ? 'Имеется'
          : 'Отсутствует'
      }}
    />
  );
};
