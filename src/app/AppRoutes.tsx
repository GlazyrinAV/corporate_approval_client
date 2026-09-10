import { Route, Routes } from 'react-router';
import { routes } from './routes';
import { NotFound } from '../pages/notFound/NotFound';
import { NewCompany } from '../pages/company/newCompany/NewCompany';
import { EditCompanyPage } from '../pages/company/editCompanyPage/EditCompanyPage';
import { CompaniesList } from '../pages/company/companiesList/CompaniesList';
import { CurrentCompany } from '../pages/company/currentCompany/CurrentCompany';
import { ParticipantList } from '../pages/participant/participantsList/ParticipantList';
import { CurrentParticipant } from '../pages/participant/currentParticipant/CurrentParticipant';
import { NewParticipant } from '../pages/participant/newParticipant/NewParticipant';
import { EditParticipantPage } from '../pages/participant/editParticipant/EditParticipantPage';

export const AppRoutes = () => (
  <>
    <Routes>
      <Route path={routes.main} element={<CompaniesList />} />
      <Route path={routes.currentCompany} element={<CurrentCompany />} />
      <Route path={routes.newCompany} element={<NewCompany />} />
      <Route path={routes.editCompany} element={<EditCompanyPage />} />
      <Route path={routes.any} element={<NotFound />} />
      <Route path={routes.participants} element={<ParticipantList />} />
      <Route path={routes.participant} element={<CurrentParticipant />} />
      <Route path={routes.newParticipant} element={<NewParticipant />} />
      <Route path={routes.editParticipant} element={<EditParticipantPage />} />
    </Routes>
  </>
);
