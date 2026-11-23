export const COMPANY_TYPE = {
  LLC: 'Общество с ограниченной ответственностью',
  JSC: 'Акционерное общество',
} as const;

export type CompanyTypeKey = keyof typeof COMPANY_TYPE;
