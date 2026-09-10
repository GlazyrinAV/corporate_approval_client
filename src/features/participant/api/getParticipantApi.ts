import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type {
  TParticipant,
  TParticipantPagebale
} from '../types/currentParticipant';

export const getParticipantsApi = (companyId: number, page: number | null) =>
  fetch(
    page
      ? `${URL}/${companyId}/participant?page=${page - 1}`
      : `${URL}/${companyId}/participant`
  )
    .then((res) => checkResponse<TParticipantPagebale>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getParticipantByIdApi = (
  companyId: number,
  participantId: number
) =>
  fetch(`${URL}/${companyId}/participant/${participantId}`)
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
      ? `${URL}/${companyId}/participant/search?criteria=${query}&page=${page - 1}`
      : `${URL}/${companyId}/participant/search?criteria=${query}`
  )
    .then((res) => checkResponse<TParticipantPagebale>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
