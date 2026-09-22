import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  getCurrentMeeting,
  updateMeeting
} from '../../../features/meeting/getMeeting/currentMeeting-slice';
import type { AppDispatch } from '../../../app/store';
import type { TMeeting } from '../../../features/meeting/types/currentMeeting';
import { EditMeeting } from '../../../features/meeting/editMeeting/EditMeeting';

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
    navigate(-1);
  };

  return (
    <EditMeeting currentMeeting={currentMeeting} onSubmit={handleSubmit} />
  );
};
