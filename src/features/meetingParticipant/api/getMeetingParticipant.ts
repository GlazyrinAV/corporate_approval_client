import { checkResponse } from '../../../shared/utils/commonApi';
import { BASE_URL } from '../../../shared/utils/commonApi';
import type {
  TMeetingParticipant,
  TMeetingParticipantPageable
} from '../types/currentMeetingParticipant';

export const getPotentialMeetingParticipantsForCurrentMeetingApi = (
  companyId: number,
  meetingId: number,
  page: number
) =>
  fetch(
    page
      ? `${BASE_URL}/${companyId}/meeting/${meetingId}/participants/potentials?page=${page - 1}`
      : `${BASE_URL}/${companyId}/meeting/${meetingId}/participants/potentials`
  )
    .then((res) => checkResponse<TMeetingParticipantPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getPotentialMeetingParticipantsForNewMeetingApi = (
  companyId: number,
  meetingType: string,
  page?: number
) =>
  fetch(
    page
      ? `${BASE_URL}/${companyId}/meeting/potentials?meetingType=${meetingType}&page=${page - 1}`
      : `${BASE_URL}/${companyId}/meeting/potentials?meetingType=${meetingType}`
  )
    .then((res) => checkResponse<TMeetingParticipantPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getAllMeetingParticipantsApi = (
  companyId: number,
  meetingId: number,
  page?: number | null
) =>
  fetch(
    page
      ? `${BASE_URL}/${companyId}/meeting/${meetingId}/participants?page=${page - 1}`
      : `${BASE_URL}/${companyId}/meeting/${meetingId}/participants`
  )
    .then((res) => {
      return checkResponse<TMeetingParticipantPageable>(res);
    })
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getMeetingParticipantApi = (
  companyId: number,
  meetingId: number,
  participantId: number
) =>
  fetch(
    `${BASE_URL}/${companyId}/meeting/${meetingId}/participants/${participantId}`
  )
    .then((res) => checkResponse<TMeetingParticipant>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
