import type { TCompany, TCompanyPagebable } from '../types/currentCompany';

const URL = 'http://localhost:8080/approval';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

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
