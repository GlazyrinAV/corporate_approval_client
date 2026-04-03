import type { TCompany } from '../types/types';

const URL = 'http://localhost:8080/approval';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TCompaniesResponse = {
  content: TCompany[];
};

export const getCompaniesApi = () =>
  fetch(`${URL}/company`)
    .then((res) => checkResponse<TCompaniesResponse>(res))
    .then((data) => {
      if (data?.content) return data.content;
      return Promise.reject(data);
    });

export const getCompanyByIdApi = (id: number) =>
  fetch(`${URL}/company/${id}`)
    .then((res) => checkResponse<TCompany>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
