import { useNavigate, useParams } from 'react-router';
import styles from './CurrentMeeting.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useEffect } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import {
  fetchMeetings,
  getIsLoading
} from '../../../features/meeting/getAllMeetings/meetings-slice';
import {
  fetchMeetingById,
  getCurrentMeeting,
  removeMeeting
} from '../../../features/meeting/getMeeting/currentMeeting-slice';
import { MeetingInfo } from '../../../features/meeting/getMeeting/MeetingInfo';
import { MeetingParticipantsInfo } from '../../../features/meetingParticipant/getAllMeetingParticipants/MeetingParticipantsInfo';

export const CurrentMeeting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string; meetingId?: string }>();
  const companyId = Number(params?.companyId);
  const meetingId = Number(params?.meetingId);
  const meeting = useSelector(getCurrentMeeting);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(
      fetchMeetingById({
        companyId: companyId,
        meetingId: meetingId
      })
    );
  }, [dispatch, companyId, meetingId]);

  const handleDelete = () => {
    dispatch(
      removeMeeting({
        companyId: companyId,
        meetingId: meetingId
      })
    );
    dispatch(fetchMeetings({ companyId: companyId, page: 1 }));
    navigate(`/company/${companyId}/meetings`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <CommonButton
          onClick={() => navigate(`/company/${companyId}/meetings`)}
        >
          Back
        </CommonButton>
      </div>
      <div className={styles.actions}>
        <CommonButton
          color='secondary'
          onClick={() =>
            navigate(`/company/${companyId}/meetings/{${meetingId}/edit`)
          }
        >
          Edit Meeting
        </CommonButton>
        <CommonButton color='error' onClick={handleDelete}>
          Delete Meeting
        </CommonButton>
      </div>
      <section className={styles.meeting_info}>
        {isLoading ? (
          <Preloader />
        ) : meeting ? (
          <MeetingInfo meeting={meeting} />
        ) : (
          'Данные о собрании отсутствуют'
        )}
      </section>

      {isLoading ? (
        <Preloader />
      ) : meeting ? (
        <section className={styles.meeting_participants}>
          <div className={styles.actions}>
            <CommonButton
              color='secondary'
              onClick={() =>
                navigate(
                  `/company/${companyId}/meetings/${meetingId}/participants`
                )
              }
            >
              View Meeting Participants
            </CommonButton>
          </div>
          <div>
            <MeetingParticipantsInfo
              companyId={companyId}
              meetingId={meetingId}
              limit={2}
            />
          </div>
        </section>
      ) : (
        'Данные об участниках собрания отсутствуют'
      )}
    </div>
  );
};
