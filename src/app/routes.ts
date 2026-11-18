export const routes = {
  any: '*',
  main: '/',
  company: '/company',
  currentCompany: '/company/:companyId',
  editCompany: '/company/:companyId/edit',
  newCompany: '/new-company',
  participants: '/company/:companyId/participants',
  participant: '/company/:companyId/participants/:participantId',
  editParticipant: '/company/:companyId/participants/:participantId/edit',
  newParticipant: '/company/:companyId/participants/new',
  meetings: '/company/:companyId/meetings',
  meeting: '/company/:companyId/meetings/:meetingId',
  editMeeting: '/company/:companyId/meetings/:meetingId/edit',
  newMeeting: '/company/:companyId/meetings/new',
  meetingParticipants: '/company/:companyId/meetings/:meetingId/participants',
  meetingParticipant:
    '/company/:companyId/meetings/:meetingId/participants/:meetingParticipantId',
  editMeetingParticipants:
    '/company/:companyId/meetings/:meetingId/participants/edit',
  changeChairman: '/company/:companyId/meetings/new/chairman',
  changeSecretary: '/company/:companyId/meetings/new/secretary'
} as const;

// ---------------------------------------------------------------------------
// Утилиты для сборки путей с типизированными параметрами
// ---------------------------------------------------------------------------

type ParamValue = string | number;

/**
 * Заменяет `:param` плейсхолдеры в route-шаблоне на реальные значения.
 * Бросает, если обязательный параметр пропущен.
 */
export function buildRoute<T extends string>(
  template: T,
  params: Record<string, ParamValue>
): string {
  return template.replace(/:(\w+)/g, (_match, key: string) => {
    const value = params[key];
    if (value === '') {
      throw new Error(`Missing required route parameter: ${key}`);
    }
    return String(value);
  });
}

/**
 * Извлекает параметры из URL-пути по route-шаблону.
 *
 * Нормализует trailing slash и query-string, приводит числовые значения
 * к `number` (где это возможно через `parseInt`).
 *
 * @example
 *   extractParams(routes.currentCompany, '/company/42/') // => { companyId: 42 }
 *   extractParams(routes.currentCompany, '/company/42?foo=bar') // => { companyId: 42 }
 * @throws Если path не совпадает с шаблоном.
 */
export function extractParams<T extends string>(
  template: T,
  path: string
): Record<string, string | number> {
  const keys = template.match(/:(\w+)/g);
  if (!keys) return {};

  // strip query string & normalise trailing slash
  const cleanPath = path.replace(/\?.*$/, '').replace(/\/+$/, '') || '/';
  const cleanTemplate = template.replace(/\/+$/, '');

  const pattern =
    '^' +
    cleanTemplate.replace(
      /:(\w+)/g,
      (_match, paramName) => `(?<${paramName}[^/]+)`
    ) +
    '$';

  const match = cleanPath.match(new RegExp(pattern));
  if (!match?.groups) {
    throw new Error(`Path "${path}" does not match template "${template}"`);
  }

  return Object.fromEntries(
    Object.entries(match.groups).map(([key, raw]) => {
      const num = Number(raw);
      return [key, Number.isInteger(num) ? num : raw] as const;
    })
  );
}

// ---------------------------------------------------------------------------
// Типы для параметров конкретных маршрутов
// ---------------------------------------------------------------------------

export interface CompanyParams extends Record<string, ParamValue> {
  companyId: number;
}

export interface ParticipantParams extends Record<string, ParamValue> {
  companyId: number;
  participantId: number;
}

export interface MeetingParams extends Record<string, ParamValue> {
  companyId: number;
  meetingId: number;
}

export interface MeetingParticipantParams extends Record<string, ParamValue> {
  companyId: number;
  meetingId: number;
  meetingParticipantId: number;
}

// ---------------------------------------------------------------------------
// Хелперы для сборки путей с автодополнением
// ---------------------------------------------------------------------------

export const routeBuilders = {
  any: () => routes.any,

  main: () => routes.main,

  newCompany: () => routes.newCompany,

  currentCompany: (params: CompanyParams) =>
    buildRoute(routes.currentCompany, params),

  editCompany: (params: CompanyParams) =>
    buildRoute(routes.editCompany, params),

  participants: (params: CompanyParams) =>
    buildRoute(routes.participants, params),

  currentParticipant: (params: ParticipantParams) =>
    buildRoute(routes.participant, params),

  editParticipant: (params: ParticipantParams) =>
    buildRoute(routes.editParticipant, params),

  newParticipant: (params: CompanyParams) =>
    buildRoute(routes.newParticipant, params),

  meetings: (params: CompanyParams) => buildRoute(routes.meetings, params),

  currentMeeting: (params: MeetingParams) => buildRoute(routes.meeting, params),

  editMeeting: (params: MeetingParams) =>
    buildRoute(routes.editMeeting, params),

  newMeeting: (params: CompanyParams) => buildRoute(routes.newMeeting, params),

  meetingParticipants: (params: MeetingParams) =>
    buildRoute(routes.meetingParticipants, params),

  currentMeetingParticipant: (params: MeetingParticipantParams) =>
    buildRoute(routes.meetingParticipant, params),

  editMeetingParticipants: (params: MeetingParams) =>
    buildRoute(routes.editMeetingParticipants, params),

  changeChairman: (params: CompanyParams) =>
    buildRoute(routes.changeChairman, params),

  changeSecretary: (params: CompanyParams) =>
    buildRoute(routes.changeSecretary, params)
} as const;
