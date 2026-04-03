import { useDispatch, useSelector } from '../../store/store';
import {
  fetchCompanies,
  getCompanies,
  getIsLoading
} from '../../store/companies/companies-slice';
import { useEffect } from 'react';
import { Preloader } from '../ui/Preloader';
import Card from '../ui/Card/Card';
import { COMPANY_TYPE } from '../../utils/const';
import style from './CompaniesList.module.css';
import { Link, useNavigate } from 'react-router';
import { routes } from '../appRoutes/Routes';

export const CompaniesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companies = useSelector(getCompanies);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section className={style.companies_list}>
      {companies
        ? companies.map((company) => (
            <Link to={`${routes.company}/${company.id}`}>
              <Card
                key={company.id}
                title='Информация о компании'
                buttonTitle='Подробнее'
                onClick={() => {
                  navigate(`${routes.company}/${company.id}`);
                }}
                content={{
                  Наименование: company.title,
                  'Вид компании': COMPANY_TYPE[company.companyType],
                  ИНН: String(company.inn),
                  ОГРН: String(company.registrationNumber)
                }}
              />
            </Link>
          ))
        : ''}
    </section>
  );
};
