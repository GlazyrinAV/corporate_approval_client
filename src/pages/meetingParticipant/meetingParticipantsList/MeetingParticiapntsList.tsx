import { useNavigate, useParams } from 'react-router';
import styles from './MeetingParticipantList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingParticipantsInfo } from '../../../features/meetingParticipant/getAllMeetingParticipants/MeetingParticipantsInfo';

export const MeetingParticipantsList = () => {
  const navigate = useNavigate();
  const params = useParams<{ companyId: string; meetingId: string }>();
  const companyId = Number(params?.companyId);
  const meetingId = Number(params?.meetingId);

  const handleClick = (participantId: number) => {
    navigate(
      `/company/${companyId}/meetings/${meetingId}/participants/${participantId}`
    );
  };

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton onClick={() => navigate(-1)}>Back</CommonButton>
        <CommonButton
          color='secondary'
          onClick={() =>
            navigate(
              `/company/${companyId}/meetings/${meetingId}/participants/edit`
            )
          }
        >
          Edit Meeting Participants
        </CommonButton>
      </div>
      <MeetingParticipantsInfo
        companyId={companyId}
        meetingId={meetingId}
        onClick={(id) => handleClick(id)}
      />
    </section>
  );
};
