import type { TPaginated } from '../../../shared/utils/commonTypes';
import type { CompanyTypeKey } from '../../../shared/utils/companyTypes';

export type TCompany = {
  id: number;
  title: string;
  inn: string;
  registrationNumber: string;
  companyType: CompanyTypeKey;
  hasBoardOfDirectors: boolean;
};

export type TCompanyPageable = TPaginated<TCompany>;
