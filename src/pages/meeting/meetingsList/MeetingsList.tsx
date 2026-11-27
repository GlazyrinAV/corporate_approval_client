import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './MeetingsList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingsInfo } from '../../../features/meeting/getAllMeetings/MeetingsInfo';
import { routeBuilders } from '../../../app/routes';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { clearFormValues } from '../../../features/meeting/editMeeting/EditMeeting-slice';

export const MeetingsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams<{ companyId: string }>();

  const companyId = useMemo(
    () => Number(params?.companyId),
    [params?.companyId]
  );

  const handleClick = useCallback(
    (meetingId: number) => {
      navigate(routeBuilders.currentMeeting({ companyId, meetingId }));
    },
    [navigate, companyId]
  );

  const handleAddMeeting = useCallback(() => {
    dispatch(clearFormValues());
    navigate(routeBuilders.newMeeting({ companyId }));
  }, [dispatch, navigate, companyId]);

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton
          onClick={() => navigate(routeBuilders.currentCompany({ companyId }))}
        >
          Back
        </CommonButton>
        <CommonButton color='secondary' onClick={handleAddMeeting}>
          Add Meeting
        </CommonButton>
      </div>
      <MeetingsInfo companyId={companyId} onClick={handleClick} />
    </section>
  );
};
