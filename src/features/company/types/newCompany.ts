import type { TCompany } from './currentCompany';

export type TNewCompany = Omit<TCompany, 'id'>;
