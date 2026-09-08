export type TCompany = {
  id?: number;
  title: string;
  inn: string;
  registrationNumber: string;
  companyType: string;
  hasBoardOfDirectors: boolean;
};

export type TCompanyPagebable = {
  content: TCompany[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: TSort;
  totalElements: number;
  totalPages: number;
};

export type TSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};
