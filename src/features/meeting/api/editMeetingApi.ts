import { buildOptions, checkResponse } from '../../../shared/utils/commonApi';
import type { TMeeting } from '../types/currentMeeting';
import type { TNewMeeting } from '../types/newMeeting';
import { buildMeetingUrl } from './getMeetingApi';

export const saveMeetingApi = (companyId: number, meeting: TNewMeeting) =>
  fetch(buildMeetingUrl(companyId), buildOptions('POST', meeting)).then((res) =>
    checkResponse<TMeeting>(res)
  );

export const updateMeetingApi = (companyId: number, meeting: TMeeting) =>
  fetch(
    buildMeetingUrl(companyId, meeting.id),
    buildOptions('PATCH', meeting)
  ).then((res) => checkResponse<TMeeting>(res));

export const deleteMeetingApi = (companyId: number, meetingId: number) =>
  fetch(buildMeetingUrl(companyId, meetingId), buildOptions('DELETE')).then(
    (res) => {
      if (res.status === 204) return;
      return Promise.reject();
    }
  );
