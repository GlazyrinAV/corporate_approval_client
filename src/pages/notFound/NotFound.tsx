import { useNavigate } from 'react-router';
import styles from './NotFound.module.css';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { routeBuilders } from '../../app/routes';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.description}>
          Запрашиваемая страница не существует или была удалена.
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
