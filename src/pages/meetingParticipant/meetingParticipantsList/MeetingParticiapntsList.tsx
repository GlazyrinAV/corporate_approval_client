import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './MeetingParticipantList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingParticipantsInfo } from '../../../features/meetingParticipant/getAllMeetingParticipants/MeetingParticipantsInfo';
import { routeBuilders } from '../../../app/routes';

export const MeetingParticipantsList = () => {
  const navigate = useNavigate();
  const params = useParams<{ companyId: string; meetingId: string }>();

  const paramsData = useMemo(
    () => ({
      companyId: Number(params?.companyId),
      meetingId: Number(params?.meetingId)
    }),
    [params?.companyId, params?.meetingId]
  );

  const handleClick = useCallback(
    (participantId: number) => {
      navigate(
        routeBuilders.currentMeetingParticipant({
          ...paramsData,
          meetingParticipantId: participantId
        })
      );
    },
    [navigate, paramsData]
  );

  const handleBack = useCallback(() => {
    navigate(routeBuilders.currentMeeting(paramsData));
  }, [navigate, paramsData]);

  const handleEdit = useCallback(() => {
    navigate(routeBuilders.editMeetingParticipants(paramsData));
  }, [navigate, paramsData]);

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton onClick={handleBack}>Back</CommonButton>
        <CommonButton color='secondary' onClick={handleEdit}>
          Edit Meeting Participants
        </CommonButton>
      </div>
      <MeetingParticipantsInfo
        companyId={paramsData.companyId}
        meetingId={paramsData.meetingId}
        onClick={handleClick}
      />
    </section>
  );
};
