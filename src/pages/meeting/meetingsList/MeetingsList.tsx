import { useNavigate, useParams } from 'react-router';
import styles from './MeetingsList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingsInfo } from '../../../features/meeting/getAllMeetings/MeetingsInfo';

export const MeetingsList = () => {
  const navigate = useNavigate();
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);

  const handleClick = (meetingId: number) => {
    navigate(`/company/${companyId}/meetings/${meetingId}`);
  };

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton
          onClick={() => navigate(-1)}
        >
          Back
        </CommonButton>
        <CommonButton
          color='secondary'
          onClick={() => navigate(`/company/${companyId}/meetings/new`)}
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
