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
  const companyId = Number(params?.companyId);
  const currentMeeting = useSelector(getCurrentMeeting);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (meeting: TMeeting) => {
    dispatch(
      updateMeeting({
        companyId: companyId,
        meeting: meeting
      })
    );
    navigate(
      routeBuilders.currentMeeting({ companyId, meetingId: meeting.id })
    );
  };

  return (
    <EditMeeting currentMeeting={currentMeeting} onSubmit={handleSubmit} />
  );
};
