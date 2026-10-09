import { useDispatch } from 'react-redux';
import { PotentialMeetingParticipantsInfoForNewMeeting } from '../../../features/meetingParticipant/getPotentialMeetingParticipants/PotentialMeetingParticipantsInfoForNewMeeting';
import type { AppDispatch } from '../../../app/store';
import { setFormValue } from '../../../features/meeting/editMeeting/EditMeeting-slice';
import { useNavigate } from 'react-router';

export const PotentialSecretary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    dispatch(setFormValue({ field: 'secretaryId', value: id }));
    navigate(-1);
  };

  return (
    <PotentialMeetingParticipantsInfoForNewMeeting
      onClick={handleClick}
    />
  );
};
