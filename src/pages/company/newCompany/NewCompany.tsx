import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { EditCompany } from '../../../features/company/editCompany/EditCompany';
import type { TNewCompany } from '../../../features/company/types/newCompany';
import { saveCompany } from '../../../features/company/getCompany/currentCompany-slice';
import { useNavigate } from 'react-router';
import { routeBuilders } from '../../../app/routes';

export const NewCompany = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (company: TNewCompany) => {
      dispatch(saveCompany(company));
      navigate(routeBuilders.main());
    },
    [dispatch, navigate]
  );

  return <EditCompany onSubmit={handleSubmit} />;
};
