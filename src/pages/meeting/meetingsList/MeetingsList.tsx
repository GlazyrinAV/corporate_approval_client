import { useNavigate, useParams } from 'react-router';
import styles from './MeetingsList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingsInfo } from '../../../features/meeting/getAllMeetings/MeetingsInfo';
import { routeBuilders } from '../../../app/routes';

export const MeetingsList = () => {
  const navigate = useNavigate();
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);

  const handleClick = (meetingId: number) => {
    navigate(routeBuilders.currentMeeting({ companyId, meetingId }));
  };

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton
          onClick={() =>
            navigate(routeBuilders.currentCompany({ companyId }))
          }
        >
          Back
        </CommonButton>
        <CommonButton
          color='secondary'
          onClick={() => navigate(routeBuilders.newMeeting({ companyId }))}
        >
          Add Meeting
        </CommonButton>
      </div>
      <MeetingsInfo
        companyId={Number(companyId)}
        onClick={(id) => handleClick(id)}
      />
    </section>
  );
};
