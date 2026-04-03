import { Route, Routes } from 'react-router';
import { CompaniesList } from '../companiesList/CompaniesList';
import { routes } from './Routes';
import { Company } from '../../pages/company/Company';
import { NewCompany } from '../../pages/newCompany/NewCompany';
import { NotFound } from '../../pages/notFound/NotFound';

export const AppRoutes = () => (
  <>
    <Routes>
      <Route path={routes.main} element={<CompaniesList />} />
      <Route path={routes.currentCompany} element={<Company />} />
      <Route path={routes.newCompany} element={<NewCompany />} />
      <Route path={routes.any} element={<NotFound />} />
    </Routes>
  </>
);
