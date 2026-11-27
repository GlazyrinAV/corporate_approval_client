import { useParams } from 'react-router';
import { CurrentCompany } from '../../../entities/company/currentCompany/CurrentCompany';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import {
  fetchCompanyById,
  getCurrentCompany,
  getIsLoading
} from './currentCompany-slice';
import { useEffect } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';

export const CompanyInfo = () => {
  const params = useParams<{ companyId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentCompany = useSelector(getCurrentCompany);
  const isLoading = useSelector(getIsLoading);
  const companyId = Number(params?.companyId);

  useEffect(() => {
    if (companyId && !Number.isNaN(companyId)) {
      dispatch(fetchCompanyById(companyId));
    }
  }, [dispatch, companyId]);

  if (isLoading) return <Preloader />;

  return <CurrentCompany currentCompany={currentCompany} />;
};
