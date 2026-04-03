import { useParams } from 'react-router';
import {
  fetchCompanyById,
  getCompanyById
} from '../../store/currentCompany/currentCompany';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { AppDispatch } from '../../store/store';

export const CurrentCompany = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentCompany = useSelector(getCompanyById);
  console.log(params.id);

  useEffect(() => {
    console.log(params.id);
    dispatch(fetchCompanyById(Number(params.id)));
  }, [dispatch, params.id]);

  return (
    <div>
      <h1>{currentCompany?.title}</h1>
      <p>{currentCompany?.inn}</p>
      <p>{currentCompany?.registrationNumber}</p>
      <p>{currentCompany?.companyType}</p>
      <p>{currentCompany?.hasBoardOfDirectors}</p>
    </div>
  );
};
