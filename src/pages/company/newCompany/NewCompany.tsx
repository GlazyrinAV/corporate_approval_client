import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { EditCompany } from '../../../features/company/editCompany/EditCompany';
import type { TNewCompany } from '../../../features/company/types/newCompany';
import { saveCompany } from '../../../features/company/getCompany/currentCompany-slice';
import { useNavigate } from 'react-router';
import { routes } from '../../../app/routes';

export const NewCompany = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (company: TNewCompany) => {
    dispatch(saveCompany(company));
    navigate(routes.main);
  };

  return <EditCompany onSubmit={handleSubmit} />;
};
