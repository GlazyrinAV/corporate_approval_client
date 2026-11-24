import {
  checkResponse,
  BASE_URL,
  buildOptions
} from '../../../shared/utils/commonApi';
import type { TMeetingParticipantPageable } from '../types/currentMeetingParticipant';
import type { TCurrentMeetingParticipant } from '../types/newMeetingParticipant';

export const saveMeetingParticipantsApi = (
  companyId: number,
  meetingId: number,
  meetingParticipants: TCurrentMeetingParticipant[]
) =>
  fetch(
    `${BASE_URL}/${companyId}/meeting/${meetingId}/participants`,
    buildOptions('POST', meetingParticipants)
  ).then((res) => checkResponse<TMeetingParticipantPageable>(res));

export const deleteMeetingParticipantApi = (
  companyId: number,
  meetingId: number,
  meetingParticipantId: number
) =>
  fetch(
    `${BASE_URL}/${companyId}/meeting/${meetingId}/participants/${meetingParticipantId}`,
    buildOptions('DELETE')
  ).then((res) => {
    if (res.status === 204) return;
    return Promise.reject();
  });
