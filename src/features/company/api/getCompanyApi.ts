import { checkResponse } from '../../../shared/utils/commonApi';
import { BASE_URL } from '../../../shared/utils/commonApi';
import type { TCompany, TCompanyPageable } from '../types/currentCompany';

export const getCompaniesApi = (page: number | null) =>
  fetch(page ? `${BASE_URL}/company?page=${page - 1}` : `${BASE_URL}/company`)
    .then((res) => checkResponse<TCompanyPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getCompanyByIdApi = (id: number) =>
  fetch(`${BASE_URL}/company/${id}`)
    .then((res) => checkResponse<TCompany>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const filterCompaniesApi = (query: string, page: number) =>
  fetch(
    page
      ? `${BASE_URL}/company/search?criteria=${query}&page=${page - 1}`
      : `${BASE_URL}/company/search?criteria=${query}`
  )
    .then((res) => checkResponse<TCompanyPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
