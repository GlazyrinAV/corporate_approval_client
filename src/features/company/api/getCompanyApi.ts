import {
  BASE_URL,
  buildQuery,
  checkResponse
} from '../../../shared/utils/commonApi';
import type { TCompany, TCompanyPageable } from '../types/currentCompany';

export const getCompaniesApi = (page: number | null, signal?: AbortSignal) =>
  fetch(
    buildQuery(`${BASE_URL}/company`, page !== null ? { page: page - 1 } : {}),
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
    buildQuery(`${BASE_URL}/company/search`, {
      criteria: query,
      page: page - 1
    }),
    { signal }
  ).then((res) => checkResponse<TCompanyPageable>(res));
