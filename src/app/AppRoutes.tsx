import { Route, Routes } from 'react-router';

import { routes } from './routes';

import { CompaniesList } from '../pages/company/companiesList/CompaniesList';
import { CurrentCompany } from '../pages/company/currentCompany/CurrentCompany';
import { EditCompanyPage } from '../pages/company/editCompanyPage/EditCompanyPage';
import { NewCompany } from '../pages/company/newCompany/NewCompany';
import { EditMeetingPage } from '../pages/meeting/editMeeting/EditMeeting';
import { CurrentMeeting } from '../pages/meeting/currentMeeting/CurrentMeeting';
import { MeetingsList } from '../pages/meeting/meetingsList/MeetingsList';
import { NewMeeting } from '../pages/meeting/newMeeting/NewMeeting';
import { EditMeetingParticipants } from '../pages/meetingParticipant/editMeetingParticipants/EditMeetingParticipants';
import { CurrentMeetingParticipant } from '../pages/meetingParticipant/currentMeetingParticipant/CurrentMeetingParticipant';
import { MeetingParticipantsList } from '../pages/meetingParticipant/meetingParticipantsList/MeetingParticiapntsList';
import { PotentialChairman } from '../pages/meetingParticipant/potentialParticipants/PotentialChairman';
import { PotentialSecretary } from '../pages/meetingParticipant/potentialParticipants/PotentialSecretary';
import { EditParticipantPage } from '../pages/participant/editParticipant/EditParticipantPage';
import { CurrentParticipant } from '../pages/participant/currentParticipant/CurrentParticipant';
import { NewParticipant } from '../pages/participant/newParticipant/NewParticipant';
import { ParticipantList } from '../pages/participant/participantsList/ParticipantList';
import { NotFound } from '../pages/notFound/NotFound';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

const routeList: RouteConfig[] = [
  { path: routes.main, element: <CompaniesList /> },
  { path: routes.currentCompany, element: <CurrentCompany /> },
  { path: routes.newCompany, element: <NewCompany /> },
  { path: routes.editCompany, element: <EditCompanyPage /> },
  { path: routes.participants, element: <ParticipantList /> },
  { path: routes.participant, element: <CurrentParticipant /> },
  { path: routes.newParticipant, element: <NewParticipant /> },
  { path: routes.editParticipant, element: <EditParticipantPage /> },
  { path: routes.meetings, element: <MeetingsList /> },
  { path: routes.meeting, element: <CurrentMeeting /> },
  { path: routes.newMeeting, element: <NewMeeting /> },
  { path: routes.editMeeting, element: <EditMeetingPage /> },
  { path: routes.meetingParticipants, element: <MeetingParticipantsList /> },
  {
    path: routes.meetingParticipant,
    element: <CurrentMeetingParticipant />,
  },
  {
    path: routes.editMeetingParticipants,
    element: <EditMeetingParticipants />,
  },
  { path: routes.changeChairman, element: <PotentialChairman /> },
  { path: routes.changeSecretary, element: <PotentialSecretary /> },
  { path: routes.any, element: <NotFound /> },
];

export const AppRoutes = () => (
  <Routes>
    {routeList.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);
