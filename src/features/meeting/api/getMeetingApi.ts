import { checkResponse } from '../../../shared/utils/commonApi';
import { BASE_URL } from '../../../shared/utils/commonApi';
import type { TMeeting, TMeetingPageable } from '../types/currentMeeting';

export const getMeetingsApi = (companyId: number, page: number | null) =>
  fetch(
    page
      ? `${BASE_URL}/${companyId}/meeting?page=${page - 1}`
      : `${BASE_URL}/${companyId}/meeting`
  )
    .then((res) => checkResponse<TMeetingPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getMeetingByIdApi = (companyId: number, meetingId: number) =>
  fetch(`${BASE_URL}/${companyId}/meeting/${meetingId}`)
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
      ? `${BASE_URL}/${companyId}/meeting/search?criteria=${query}&page=${page - 1}`
      : `${BASE_URL}/${companyId}/meeting/search?criteria=${query}`
  )
    .then((res) => checkResponse<TMeetingPageable>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });
