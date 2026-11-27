import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { PotentialMeetingParticipantsInfoForNewMeeting } from '../../../features/meetingParticipant/getPotentialMeetingParticipants/PotentialMeetingParticipantsInfoForNewMeeting';
import type { AppDispatch } from '../../../app/store';
import { setFormValue } from '../../../features/meeting/editMeeting/EditMeeting-slice';
import { useLocation, useNavigate, useParams } from 'react-router';
import { routeBuilders } from '../../../app/routes';

export const PotentialChairman = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const meetingId = (state as { meetingId?: number } | null)?.meetingId;

  const companyId = useMemo(
    () => Number(params?.companyId),
    [params?.companyId]
  );

  const handleClick = useCallback(
    (id: number) => {
      dispatch(setFormValue({ field: 'chairmanId', value: id }));
      if (meetingId) {
        navigate(routeBuilders.editMeeting({ companyId, meetingId }));
      } else {
        navigate(routeBuilders.newMeeting({ companyId }));
      }
    },
    [dispatch, navigate, companyId, meetingId]
  );

  return (
    <PotentialMeetingParticipantsInfoForNewMeeting onClick={handleClick} />
  );
};
