import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch } from '../../../app/store';
import type { TNewMeeting } from '../../../features/meeting/types/newMeeting';
import { saveMeeting } from '../../../features/meeting/editMeeting/EditMeeting-slice';
import {
  clearChosenList,
  clearMeetingParticipants
} from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import { clearPotentialList } from '../../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { routeBuilders } from '../../../app/routes';
import { EditMeeting } from '../../../features/meeting/editMeeting/EditMeeting';

export const NewMeeting = () => {
  const params = useParams<{ companyId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const companyId = useMemo(
    () => Number(params?.companyId),
    [params?.companyId]
  );

  useEffect(() => {
    dispatch(clearMeetingParticipants());
    dispatch(clearChosenList());
    dispatch(clearPotentialList());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (meeting: TNewMeeting) => {
      dispatch(saveMeeting({ companyId, meeting }));
      navigate(routeBuilders.meetings({ companyId }));
    },
    [dispatch, navigate, companyId]
  );

  return <EditMeeting onSubmit={handleSubmit} />;
};
