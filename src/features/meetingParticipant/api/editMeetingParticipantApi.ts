import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type { TMeetingParticipantPagebale } from '../types/currentMeetingParticipant';
import type { TNewMeetingParticipant } from '../types/newMeetingParticipant';

export const saveMeetingParticipantsApi = (
  companyId: number,
  meetingId: number,
  meetingParticipants: TNewMeetingParticipant[]
) =>
  fetch(`${URL}/${companyId}/meeting/${meetingId}/participants`, {
    method: 'POST',
    body: JSON.stringify(meetingParticipants),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TMeetingParticipantPagebale>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const deleteMeetingParticipantApi = (
  companyId: number,
  meetingId: number,
  meetingParticipantId: number
) =>
  fetch(
    `${URL}/${companyId}/meeting/${meetingId}/participants/${meetingParticipantId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((res) => {
    if (res.status === 204) {
      return;
    }
    return Promise.reject();
  });
