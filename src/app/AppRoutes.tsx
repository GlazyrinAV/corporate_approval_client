import { Route, Routes } from 'react-router';
import { routes } from './routes';
import { NotFound } from '../pages/notFound/NotFound';
import { CompaniesList } from '../pages/companiesList/CompaniesList';
import { CurrentCompany } from '../pages/currentCompany/CurrentCompany';
import { NewCompany } from '../pages/newCompany/NewCompany';
import { EditCompanyPage } from '../pages/editCompanyPage/EditCompanyPage';

export const AppRoutes = () => (
  <>
    <Routes>
      <Route path={routes.main} element={<CompaniesList />} />
      <Route path={routes.currentCompany} element={<CurrentCompany />} />
      <Route path={routes.newCompany} element={<NewCompany />} />
      <Route path={routes.editCompany} element={<EditCompanyPage />} />
      <Route path={routes.any} element={<NotFound />} />
    </Routes>
  </>
);
