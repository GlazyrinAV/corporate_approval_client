import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch } from '../../../app/store';
import {
  fetchMeetingParticipantById,
  getCurrentMeetingParticipant
} from '../../../features/meetingParticipant/getMeetingParticipant/currentMeetingParticipant-slice';
import { useEffect } from 'react';
import styles from './CurrentMeetingParticipant.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { getIsCurrentLoading } from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import { MeetingParticipantInfo } from '../../../features/meetingParticipant/getMeetingParticipant/MeetingParticipantInfo';

export const CurrentMeetingParticipant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{
    companyId: string;
    meetingId: string;
    meetingParticipantId: string;
  }>();
  const companyId = Number(params?.companyId);
  const meetingId = Number(params?.meetingId);
  const meetingParticipantId = Number(params?.meetingParticipantId);
  const meetingParticipant = useSelector(getCurrentMeetingParticipant);
  const isLoading = useSelector(getIsCurrentLoading);

  useEffect(() => {
    dispatch(
      fetchMeetingParticipantById({
        companyId: companyId,
        meetingId: meetingId,
        meetingParticipantId: meetingParticipantId
      })
    );
  }, [dispatch, companyId, meetingId, meetingParticipantId]);

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <CommonButton
          onClick={() =>
            navigate(`/company/${companyId}/meetings/${meetingId}/participants`)
          }
        >
          Back
        </CommonButton>
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
