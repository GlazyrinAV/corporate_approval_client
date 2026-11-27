import { useNavigate, useParams } from 'react-router';
import { CompanyInfo } from '../../../features/company/getCompany/CompanyInfo';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import styles from './CurrentCompany.module.css';
import { routeBuilders } from '../../../app/routes';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { removeCompany } from '../../../features/company/getCompany/currentCompany-slice';
import { PartcipantsInfo } from '../../../features/participant/getAll/ParticipantsInfo';
import { MeetingsInfo } from '../../../features/meeting/getAllMeetings/MeetingsInfo';

export const CurrentCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);

  const handleDelete = () => {
    dispatch(removeCompany(companyId));
  };

  return (
    <div className={styles.wraper}>
      <div className={styles.navigation}>
        <CommonButton onClick={() => navigate(routeBuilders.main())}>
          Back
        </CommonButton>
      </div>
      <section className={styles.company_info}>
        <div className={styles.actions}>
          <CommonButton
            color="secondary"
            onClick={() =>
              navigate(routeBuilders.editCompany({ companyId: companyId }))
            }
          >
            Edit Company
          </CommonButton>
          <CommonButton color="error" onClick={handleDelete}>
            Delete Company
          </CommonButton>
        </div>
        <div className={styles.container}>
          <CompanyInfo />
        </div>
      </section>
      <section className={styles.participants_info}>
        <div className={styles.actions}>
          <CommonButton
            color="secondary"
            onClick={() =>
              navigate(routeBuilders.participants({ companyId }))
            }
          >
            View and Edit Participants
          </CommonButton>
        </div>
        <div className={styles.container}>
          <PartcipantsInfo companyId={companyId} limit={3} />
        </div>
      </section>
      <section className={styles.meetings_info}>
        <div className={styles.actions}>
          <CommonButton
            color="secondary"
            onClick={() =>
              navigate(routeBuilders.meetings({ companyId }))
            }
          >
            View and Edit Meetings
          </CommonButton>
        </div>
        <div className={styles.container}>
          <MeetingsInfo companyId={companyId} limit={3} />
        </div>
      </section>
    </div>
  );
};
