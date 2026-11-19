import { useDispatch } from 'react-redux';
import { PotentialMeetingParticipantsInfoForNewMeeting } from '../../../features/meetingParticipant/getPotentialMeetingParticipants/PotentialMeetingParticipantsInfoForNewMeeting';
import type { AppDispatch } from '../../../app/store';
import { setFormValue } from '../../../features/meeting/editMeeting/EditMeeting-slice';
import { useLocation, useNavigate, useParams } from 'react-router';
import { routeBuilders } from '../../../app/routes';

export const PotentialSecretary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { meetingId } = state || null;

  const handleClick = (id: number) => {
    dispatch(setFormValue({ field: 'secretaryId', value: id }));
    if (meetingId) {
      navigate(routeBuilders.editMeeting({ companyId, meetingId }));
    } else {
      navigate(routeBuilders.newMeeting({ companyId }));
    }
  };

  return (
    <PotentialMeetingParticipantsInfoForNewMeeting onClick={handleClick} />
  );
};
