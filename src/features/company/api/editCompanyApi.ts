import type { TCompany } from '../types/currentCompany';
import type { TNewCompany } from '../types/newCompany';

const URL = 'http://localhost:8080/approval/company';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TCompaniesResponse = {
  content: TCompany;
};

export const saveCompanyApi = (company: TNewCompany) =>
  fetch(`${URL}`, {
    method: 'POST',
    body: JSON.stringify(company),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TCompany>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const updateCompanyApi = (company: TCompany) =>
  fetch(`${URL}/${company.id}`, {
    method: 'PATCH',
    body: JSON.stringify(company),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TCompany>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const deleteCompanyApi = (id: number) =>
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TCompaniesResponse>(res));
