import { BASE_URL, checkResponse } from '../../../shared/utils/commonApi';
import type { TMeeting, TMeetingPageable } from '../types/currentMeeting';

export const buildMeetingUrl = (
  companyId: number,
  meetingId?: number,
  params?: Record<string, string | number>
): string => {
  const url = new URL(`${BASE_URL}/${companyId}/meeting`);
  if (meetingId !== undefined) {
    url.pathname += `/${meetingId}`;
  }
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
};

const buildSearchUrl = (
  companyId: number,
  query: string,
  page: number
): string => {
  const url = new URL(`${BASE_URL}/${companyId}/meeting/search`);
  url.searchParams.set('criteria', query);
  url.searchParams.set('page', String(page - 1));
  return url.toString();
};

export const getMeetingsApi = (companyId: number, page: number | null) =>
  fetch(
    buildMeetingUrl(
      companyId,
      undefined,
      page !== null ? { page: page - 1 } : undefined
    )
  ).then((res) => checkResponse<TMeetingPageable>(res));

export const getMeetingByIdApi = (companyId: number, meetingId: number) =>
  fetch(buildMeetingUrl(companyId, meetingId)).then((res) =>
    checkResponse<TMeeting>(res)
  );

export const filterMeetingsApi = (
  companyId: number,
  query: string,
  page: number
) =>
  fetch(buildSearchUrl(companyId, query, page)).then((res) =>
    checkResponse<TMeetingPageable>(res)
  );
