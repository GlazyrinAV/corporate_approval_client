import { useNavigate, useParams } from 'react-router';
import { MeetingParticipantEditForm } from '../../../entities/meetingParticipant/meetingParticipantEditForm/MeetingParticipantEditForm';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import styles from './EditMeetingParticipant.module.css';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import {
  fetchMeetingParticipants,
  getChosenMeetingParticipants,
  saveMeetingParticipants
} from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';

export const EditMeetingParticipants = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string; meetingId: string }>();
  const companyId = Number(params?.companyId);
  const meetingId = Number(params?.meetingId);
  const chosenMeetingParticipants = useSelector(getChosenMeetingParticipants);
  // Обработка сохранения изменений в составе участников собрания
  const handleSave = useCallback(() => {
    if (chosenMeetingParticipants.length === 0) {
      console.warn('No participants selected');
      return;
    }

    dispatch(
      saveMeetingParticipants({
        companyId,
        meetingId,
        participants: chosenMeetingParticipants
      })
    );

    dispatch(
      fetchMeetingParticipants({
        companyId,
        meetingId,
        page: 1
      })
    );

    navigate(`/company/${companyId}/meetings/${meetingId}/participants`);
  }, [companyId, meetingId, dispatch, navigate, chosenMeetingParticipants]);

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton onClick={() => navigate(-1)}>Back</CommonButton>
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
