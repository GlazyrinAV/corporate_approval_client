import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type {
  TMeetingParticipant,
  TMeetingParticipantPagebale
} from '../types/currentMeetingParticipant';

export const getPotentialMeetingParticipantsApi = (
  companyId: number,
  meetingId: number,
  page: number | null
) =>
  fetch(
    page
      ? `${URL}/${companyId}/meeting/${meetingId}/participants/potentials?page=${page - 1}`
      : `${URL}/${companyId}/meeting/${meetingId}/participants/potentials`
  )
    .then((res) => checkResponse<TMeetingParticipantPagebale>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getAllMeetingParticipantsApi = (
  companyId: number,
  meetingId: number,
  page: number | null
) =>
  fetch(
    page
      ? `${URL}/${companyId}/meeting/${meetingId}/participants?page=${page - 1}`
      : `${URL}/${companyId}/meeting/${meetingId}/participants`
  )
    .then((res) => {
      return checkResponse<TMeetingParticipantPagebale>(res)})
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
    `${URL}/${companyId}/meeting/${meetingId}/participants/${participantId}`
  )
    .then((res) => checkResponse<TMeetingParticipant>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
