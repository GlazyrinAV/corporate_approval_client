import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MeetingParticipantEditForm } from '../../../entities/meetingParticipant/meetingParticipantEditForm/MeetingParticipantEditForm';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import styles from './EditMeetingParticipant.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import {
  fetchMeetingParticipants,
  getChosenMeetingParticipants,
  saveMeetingParticipants
} from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import { routeBuilders } from '../../../app/routes';

export const EditMeetingParticipants = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string; meetingId: string }>();
  const chosenMeetingParticipants = useSelector(getChosenMeetingParticipants);

  const paramsData = useMemo(
    () => ({
      companyId: Number(params?.companyId),
      meetingId: Number(params?.meetingId)
    }),
    [params?.companyId, params?.meetingId]
  );

  const handleSave = useCallback(() => {
    if (chosenMeetingParticipants.length === 0) {
      console.error('No participants selected');
      return;
    }

    dispatch(
      saveMeetingParticipants({
        ...paramsData,
        participants: chosenMeetingParticipants
      })
    );

    dispatch(
      fetchMeetingParticipants({
        ...paramsData,
        page: 1
      })
    );

    navigate(routeBuilders.meetingParticipants(paramsData));
  }, [dispatch, navigate, paramsData, chosenMeetingParticipants]);

  const handleBack = useCallback(() => {
    navigate(routeBuilders.meetingParticipants(paramsData));
  }, [navigate, paramsData]);

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton onClick={handleBack}>Back</CommonButton>
      </div>
      <div className={styles.main_section}>
        <div className={styles.actions}>
          <CommonButton color='secondary' onClick={handleSave}>
            Save Meeting Participants
          </CommonButton>
        </div>
        <div>
          <MeetingParticipantEditForm />
        </div>
      </div>
    </section>
  );
};
