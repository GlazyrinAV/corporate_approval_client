import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './CurrentMeeting.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { getIsLoading } from '../../../features/meeting/getAllMeetings/meetings-slice';
import {
  fetchMeetingById,
  getCurrentMeeting,
  removeMeeting
} from '../../../features/meeting/getMeeting/currentMeeting-slice';
import { MeetingInfo } from '../../../features/meeting/getMeeting/MeetingInfo';
import { MeetingParticipantsInfo } from '../../../features/meetingParticipant/getAllMeetingParticipants/MeetingParticipantsInfo';
import { routeBuilders } from '../../../app/routes';
import { loadDefaultValues } from '../../../features/meeting/editMeeting/EditMeeting-slice';

export const CurrentMeeting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string; meetingId?: string }>();
  const meeting = useSelector(getCurrentMeeting);
  const isLoading = useSelector(getIsLoading);

  const companyId = useMemo(
    () => Number(params?.companyId),
    [params?.companyId]
  );
  const meetingId = useMemo(
    () => Number(params?.meetingId),
    [params?.meetingId]
  );

  const meetingParams = useMemo(
    () => ({ companyId, meetingId }),
    [companyId, meetingId]
  );

  useEffect(() => {
    dispatch(fetchMeetingById(meetingParams));
  }, [dispatch, meetingParams]);

  const handleDelete = useCallback(() => {
    dispatch(removeMeeting(meetingParams));
    navigate(routeBuilders.meetings({ companyId }));
  }, [dispatch, meetingParams, navigate, companyId]);

  const handleEdit = useCallback(() => {
    if (meeting) {
      dispatch(loadDefaultValues(meeting));
      navigate(routeBuilders.editMeeting(meetingParams));
    }
  }, [dispatch, meeting, meetingParams, navigate]);

  const hasData = !isLoading && meeting != null;

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <CommonButton
          onClick={() => navigate(routeBuilders.meetings({ companyId }))}
        >
          Back
        </CommonButton>
      </div>
      <div className={styles.actions}>
        <CommonButton color='secondary' onClick={handleEdit}>
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

      {hasData ? (
        <section className={styles.meeting_participants}>
          <div className={styles.actions}>
            <CommonButton
              color='secondary'
              onClick={() =>
                navigate(
                  routeBuilders.meetingParticipants({ companyId, meetingId })
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
