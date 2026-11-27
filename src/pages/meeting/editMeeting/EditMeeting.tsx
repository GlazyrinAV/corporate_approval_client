import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getCurrentMeeting } from '../../../features/meeting/getMeeting/currentMeeting-slice';
import type { AppDispatch } from '../../../app/store';
import type { TMeeting } from '../../../features/meeting/types/currentMeeting';
import { EditMeeting } from '../../../features/meeting/editMeeting/EditMeeting';
import { updateMeeting } from '../../../features/meeting/editMeeting/EditMeeting-slice';
import { routeBuilders } from '../../../app/routes';

export const EditMeetingPage = () => {
  const params = useParams<{ companyId: string; participantId?: string }>();
  const currentMeeting = useSelector(getCurrentMeeting);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const companyId = useMemo(
    () => Number(params?.companyId),
    [params?.companyId]
  );

  const handleSubmit = useCallback(
    (meeting: TMeeting) => {
      dispatch(updateMeeting({ companyId, meeting }));
      navigate(
        routeBuilders.currentMeeting({ companyId, meetingId: meeting.id })
      );
    },
    [dispatch, navigate, companyId]
  );

  return (
    <EditMeeting currentMeeting={currentMeeting} onSubmit={handleSubmit} />
  );
};
