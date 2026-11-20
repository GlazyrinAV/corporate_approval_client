import { checkResponse } from '../../../shared/utils/commonApi';
import { BASE_URL } from '../../../shared/utils/commonApi';
import type {
  TParticipant,
  TParticipantPageable
} from '../types/currentParticipant';

export const getParticipantsApi = (companyId: number, page: number | null) =>
  fetch(
    page
      ? `${BASE_URL}/${companyId}/participant?page=${page - 1}`
      : `${BASE_URL}/${companyId}/participant`
  )
    .then((res) => checkResponse<TParticipantPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getParticipantByIdApi = (
  companyId: number,
  participantId: number
) =>
  fetch(`${BASE_URL}/${companyId}/participant/${participantId}`)
    .then((res) => checkResponse<TParticipant>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const filterParticipantsApi = (
  companyId: number,
  query: string,
  page: number
) =>
  fetch(
    page
      ? `${BASE_URL}/${companyId}/participant/search?criteria=${query}&page=${page - 1}`
      : `${BASE_URL}/${companyId}/participant/search?criteria=${query}`
  )
    .then((res) => checkResponse<TParticipantPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
