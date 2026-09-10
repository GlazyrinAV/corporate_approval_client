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
};
