import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type { TCompany, TCompanyPagebable } from '../types/currentCompany';

export const getCompaniesApi = (page: number | null) =>
  fetch(page ? `${URL}/company?page=${page - 1}` : `${URL}/company`)
    .then((res) => checkResponse<TCompanyPagebable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getCompanyByIdApi = (id: number) =>
  fetch(`${URL}/company/${id}`)
    .then((res) => checkResponse<TCompany>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const filterCompaniesApi = (query: string, page: number) =>
  fetch(
    page
      ? `${URL}/company/search?criteria=${query}&page=${page - 1}`
      : `${URL}/company/search?criteria=${query}`
  )
    .then((res) => checkResponse<TCompanyPagebable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
