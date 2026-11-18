import { useNavigate, useParams } from 'react-router';
import styles from './MeetingParticipantList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingParticipantsInfo } from '../../../features/meetingParticipant/getAllMeetingParticipants/MeetingParticipantsInfo';
import { routeBuilders } from '../../../app/routes';

export const MeetingParticipantsList = () => {
  const navigate = useNavigate();
  const params = useParams<{ companyId: string; meetingId: string }>();
  const companyId = Number(params?.companyId);
  const meetingId = Number(params?.meetingId);

  const handleClick = (participantId: number) => {
    navigate(
      routeBuilders.currentMeetingParticipant({
        companyId,
        meetingId,
        meetingParticipantId: participantId
      })
    );
  };

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton
          onClick={() => navigate(routeBuilders.currentCompany({ companyId }))}
        >
          Back
        </CommonButton>
        <CommonButton
          color='secondary'
          onClick={() =>
            navigate(
              routeBuilders.editMeetingParticipants({ companyId, meetingId })
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
