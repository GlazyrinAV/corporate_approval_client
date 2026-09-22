import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch } from '../../../app/store';
import type { TNewMeeting } from '../../../features/meeting/types/newMeeting';
import { saveMeeting } from '../../../features/meeting/getMeeting/currentMeeting-slice';
import { MeetingEditForm } from '../../../entities/meeting/MeetingEditForm';

export const NewMeeting = () => {
  const params = useParams<{ companyId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const companyId = Number(params?.companyId);

  const handleSubmit = (meeting: TNewMeeting) => {
    dispatch(saveMeeting({ companyId: companyId, meeting: meeting }));
    navigate(`/company/${companyId}/meetings`);
  };

  return <MeetingEditForm companyId={companyId} onSubmit={handleSubmit} />;
};
