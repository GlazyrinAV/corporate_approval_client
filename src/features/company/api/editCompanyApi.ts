import {
  BASE_URL,
  buildOptions,
  checkResponse
} from '../../../shared/utils/commonApi';
import type { TCompany } from '../types/currentCompany';
import type { TNewCompany } from '../types/newCompany';
import { buildCompanyUrl } from './getCompanyApi';

export const saveCompanyApi = (company: TNewCompany, signal?: AbortSignal) =>
  fetch(buildCompanyUrl(`${BASE_URL}/company`, {}), {
    ...buildOptions('POST', company),
    signal
  }).then((res) => checkResponse<TCompany>(res));

export const updateCompanyApi = (company: TCompany, signal?: AbortSignal) =>
  fetch(`${BASE_URL}/company/${company.id}`, {
    ...buildOptions('PATCH', company),
    signal
  }).then((res) => checkResponse<TCompany>(res));

export const deleteCompanyApi = (id: number, signal?: AbortSignal) =>
  fetch(`${BASE_URL}/company/${id}`, {
    ...buildOptions('DELETE'),
    signal
  }).then((res) => {
    if (res.status === 204) return;
    return Promise.reject(new Error('Delete failed'));
  });
