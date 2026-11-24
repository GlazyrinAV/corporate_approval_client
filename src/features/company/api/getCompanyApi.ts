import {
  BASE_URL,
  checkResponse
} from '../../../shared/utils/commonApi';
import type { TCompany, TCompanyPageable } from '../types/currentCompany';

export const buildCompanyUrl = (
  base: string,
  params: Record<string, string | number>
): string => {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url.toString();
};

export const getCompaniesApi = (page: number | null, signal?: AbortSignal) =>
  fetch(
    buildCompanyUrl(`${BASE_URL}/company`, page !== null ? { page: page - 1 } : {}),
    { signal }
  ).then((res) => checkResponse<TCompanyPageable>(res));

export const getCompanyByIdApi = (id: number, signal?: AbortSignal) =>
  fetch(`${BASE_URL}/company/${id}`, { signal }).then((res) =>
    checkResponse<TCompany>(res)
  );

export const filterCompaniesApi = (
  query: string,
  page: number,
  signal?: AbortSignal
) =>
  fetch(
    buildCompanyUrl(`${BASE_URL}/company/search`, {
      criteria: query,
      page: page - 1
    }),
    { signal }
  ).then((res) => checkResponse<TCompanyPageable>(res));
