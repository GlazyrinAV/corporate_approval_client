import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch } from '../../../app/store';
import {
  fetchMeetingParticipantById,
  getCurrentMeetingParticipant
} from '../../../features/meetingParticipant/getMeetingParticipant/currentMeetingParticipant-slice';
import styles from './CurrentMeetingParticipant.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { getIsLoading } from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import { MeetingParticipantInfo } from '../../../features/meetingParticipant/getMeetingParticipant/MeetingParticipantInfo';
import { routeBuilders } from '../../../app/routes';

export const CurrentMeetingParticipant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{
    companyId: string;
    meetingId: string;
    meetingParticipantId: string;
  }>();
  const meetingParticipant = useSelector(getCurrentMeetingParticipant);
  const isLoading = useSelector(getIsLoading);

  const paramsData = useMemo(
    () => ({
      companyId: Number(params?.companyId),
      meetingId: Number(params?.meetingId),
      meetingParticipantId: Number(params?.meetingParticipantId)
    }),
    [params?.companyId, params?.meetingId, params?.meetingParticipantId]
  );

  useEffect(() => {
    dispatch(fetchMeetingParticipantById(paramsData));
  }, [dispatch, paramsData]);

  const handleBack = useCallback(() => {
    navigate(routeBuilders.meetingParticipants(paramsData));
  }, [navigate, paramsData]);

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <CommonButton onClick={handleBack}>Back</CommonButton>
      </div>
      <section>
        {isLoading ? (
          <Preloader />
        ) : meetingParticipant ? (
          <MeetingParticipantInfo meetingParticipant={meetingParticipant} />
        ) : (
          'Данные об участнике собрания отсутствуют'
        )}
      </section>
    </div>
  );
};
