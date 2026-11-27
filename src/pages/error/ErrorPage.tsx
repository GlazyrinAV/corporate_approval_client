import { useNavigate } from 'react-router';
import styles from './ErrorPage.module.css';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { routeBuilders } from '../../app/routes';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.code}>505</span>
        <h1 className={styles.title}>Внутренняя ошибка сервера</h1>
        <p className={styles.description}>
          Что-то пошло не так. Попробуйте обновить страницу или вернуться на
          главную.
        </p>
        <CommonButton
          variant='contained'
          onClick={() => navigate(routeBuilders.main())}
        >
          На главную
        </CommonButton>
      </div>
    </div>
  );
};
