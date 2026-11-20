import type { TPageable } from '../../../shared/utils/commonTypes';

export type TCompany = {
  id: number;
  title: string;
  inn: string;
  registrationNumber: string;
  companyType: string;
  hasBoardOfDirectors: boolean;
};

export type TCompanyPageable = TPageable & {
  content: TCompany[];
};
