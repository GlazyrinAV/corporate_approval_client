import { checkResponse, BASE_URL } from '../../../shared/utils/commonApi';
import type {
  TMeetingParticipant,
  TMeetingParticipantPageable
} from '../types/currentMeetingParticipant';

const buildMeetingParticipantUrl = (
  companyId: number,
  meetingId: number | undefined,
  path: string,
  page?: number | null
) => {
  const base =
    meetingId != null
      ? `${BASE_URL}/${companyId}/meeting/${meetingId}${path}`
      : `${BASE_URL}/${companyId}/meeting${path}`;

  const query = page != null ? `?page=${page - 1}` : '';
  return `${base}${query}`;
};

export const getPotentialMeetingParticipantsForCurrentMeetingApi = (
  companyId: number,
  meetingId: number,
  page: number
) =>
  fetch(
    buildMeetingParticipantUrl(
      companyId,
      meetingId,
      '/participants/potentials',
      page
    )
  ).then((res) => checkResponse<TMeetingParticipantPageable>(res));

export const getPotentialMeetingParticipantsForNewMeetingApi = (
  companyId: number,
  meetingType: string,
  page?: number
) =>
  fetch(
    buildMeetingParticipantUrl(
      companyId,
      undefined,
      `/potentials?meetingType=${meetingType}`,
      page
    )
  ).then((res) => checkResponse<TMeetingParticipantPageable>(res));

export const getAllMeetingParticipantsApi = (
  companyId: number,
  meetingId: number,
  page?: number | null
) =>
  fetch(
    buildMeetingParticipantUrl(companyId, meetingId, '/participants', page)
  ).then((res) => checkResponse<TMeetingParticipantPageable>(res));

export const getMeetingParticipantApi = (
  companyId: number,
  meetingId: number,
  participantId: number
) =>
  fetch(
    buildMeetingParticipantUrl(
      companyId,
      meetingId,
      `/participants/${participantId}`
    )
  ).then((res) => checkResponse<TMeetingParticipant>(res));
