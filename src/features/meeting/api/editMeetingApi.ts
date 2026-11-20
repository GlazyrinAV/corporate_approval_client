import { checkResponse } from '../../../shared/utils/commonApi';
import { BASE_URL } from '../../../shared/utils/commonApi';
import type { TMeeting } from '../types/currentMeeting';
import type { TNewMeeting } from '../types/newMeeting';

export const saveMeetingApi = (companyId: number, meeting: TNewMeeting) =>
  fetch(`${BASE_URL}/${companyId}/meeting`, {
    method: 'POST',
    body: JSON.stringify(meeting),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TMeeting>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const updateMeetingApi = (companyId: number, meeting: TMeeting) =>
  fetch(`${BASE_URL}/${companyId}/meeting/${meeting.id}`, {
    method: 'PATCH',
    body: JSON.stringify(meeting),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TMeeting>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const deleteMeetingApi = (companyId: number, meetingId: number) =>
  fetch(`${BASE_URL}/${companyId}/meeting/${meetingId}`, {
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
