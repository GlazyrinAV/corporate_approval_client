import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type { TCompany } from '../types/currentCompany';
import type { TNewCompany } from '../types/newCompany';

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
  }).then((res) => {
    if (res.status === 204) {
      return;
    }
    return Promise.reject();
  });
