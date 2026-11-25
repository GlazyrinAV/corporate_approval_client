import { BASE_URL, checkResponse } from '../../../shared/utils/commonApi';
import type {
  TParticipant,
  TParticipantPageable
} from '../types/currentParticipant';

export const buildParticipantUrl = (companyId: number, page?: number) => {
  const base = `${BASE_URL}/${companyId}/participant`;
  return page !== undefined ? `${base}?page=${page - 1}` : base;
};

export const buildParticipantByIdUrl = (
  companyId: number,
  participantId: number
) => `${BASE_URL}/${companyId}/participant/${participantId}`;

const buildFilterParticipantsUrl = (
  companyId: number,
  query: string,
  page?: number
) => {
  const base = `${BASE_URL}/${companyId}/participant/search?criteria=${query}`;
  return page !== undefined ? `${base}&page=${page - 1}` : base;
};

export const getParticipantsApi = (companyId: number, page: number | null) =>
  fetch(buildParticipantUrl(companyId, page ?? undefined)).then((res) =>
    checkResponse<TParticipantPageable>(res)
  );

export const getParticipantByIdApi = (
  companyId: number,
  participantId: number
) =>
  fetch(buildParticipantByIdUrl(companyId, participantId)).then((res) =>
    checkResponse<TParticipant>(res)
  );

export const filterParticipantsApi = (
  companyId: number,
  query: string,
  page: number
) =>
  fetch(buildFilterParticipantsUrl(companyId, query, page)).then((res) =>
    checkResponse<TParticipantPageable>(res)
  );
