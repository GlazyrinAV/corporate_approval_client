import { useNavigate } from 'react-router';
import { MeetingParticipantEditForm } from '../../../entities/meetingParticipant/meetingParticipantEditForm/MeetingParticipantEditForm';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import styles from './EditMeetingParticipant.module.css';

export const EditMeetingParticipants = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton onClick={() => navigate(-1)}>Back</CommonButton>
      </div>
      <div>
        <MeetingParticipantEditForm />
      </div>
    </section>
  );
};
