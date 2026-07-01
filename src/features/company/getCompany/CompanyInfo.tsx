import { useParams } from 'react-router';
import { CurrentCompany } from '../../../entities/company/currentCompany/CurrentCompany';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { fetchCompanyById, getCurrentCompany } from './currentCompany-slice';
import { useEffect } from 'react';

export const CompanyInfo = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentCompany = useSelector(getCurrentCompany);
  const companyId = Number(params.id);

  useEffect(() => {
    dispatch(fetchCompanyById(companyId));
  }, [dispatch, companyId]);

  return <CurrentCompany currentCompany={currentCompany} />;
};
