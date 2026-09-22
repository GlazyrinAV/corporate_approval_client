import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type { TMeeting, TMeetingPagebable } from '../types/currentMeeting';

export const getMeetingsApi = (companyId: number, page: number | null) =>
  fetch(
    page
      ? `${URL}/${companyId}/meeting?page=${page - 1}`
      : `${URL}/${companyId}/meeting`
  )
    .then((res) => checkResponse<TMeetingPagebable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getMeetingByIdApi = (companyId: number, meetingId: number) =>
  fetch(`${URL}/${companyId}/meeting/${meetingId}`)
    .then((res) => checkResponse<TMeeting>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const filterMeetingsApi = (
  companyId: number,
  query: string,
  page: number
) =>
  fetch(
    page
      ? `${URL}/${companyId}/meeting/search?criteria=${query}&page=${page - 1}`
      : `${URL}/${companyId}/meeting/search?criteria=${query}`
  )
    .then((res) => checkResponse<TMeetingPagebable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
