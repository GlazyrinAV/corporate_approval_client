import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentCompany,
  updateCompany
} from '../../../features/company/getCompany/currentCompany-slice';
import { EditCompany } from '../../../features/company/editCompany/EditCompany';
import type { TCompany } from '../../../features/company/types/currentCompany';
import type { AppDispatch } from '../../../app/store';
import { useNavigate } from 'react-router';
import { routeBuilders } from '../../../app/routes';

export const EditCompanyPage = () => {
  const currentCompany = useSelector(getCurrentCompany);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (company: TCompany) => {
    dispatch(updateCompany(company));
    navigate(routeBuilders.currentCompany({ companyId: company?.id }));
  };

  return (
    <EditCompany currentCompany={currentCompany} onSubmit={handleSubmit} />
  );
};
