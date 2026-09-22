export const routes = {
  any: '*',
  main: '/',
  company: '/company',
  currentCompany: '/company/:id/',
  editCompany: '/company/:id/edit',
  newCompany: '/new-company',
  participants: '/company/:companyId/participants',
  participant: '/company/:companyId/participants/:participantId',
  editParticipant: '/company/:companyId/participants/:participantId/edit',
  newParticipant: '/company/:companyId/participants/new',
  meetings: '/company/:companyId/meetings',
  meeting: '/company/:companyId/meetings/:meetingId',
  editMeeting: '/company/:companyId/meetings/:meetingId/edit',
  newMeeting: '/company/:companyId/meetings/new'
};
