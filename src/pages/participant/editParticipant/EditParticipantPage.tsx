import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentParticipant,
  updateParticipant
} from '../../../features/participant/getParticipant/currrentParticipant-slice';
import { useNavigate, useParams } from 'react-router';
import type { AppDispatch } from '../../../app/store';
import type { TParticipant } from '../../../features/participant/types/currentParticipant';
import { EditParticipant } from '../../../features/participant/editParticipant/EditParticipant';

export const EditParticipantPage = () => {
  const params = useParams<{ companyId: string; participantId?: string }>();
  const companyId = Number(params?.companyId);
  const currentParticipant = useSelector(getCurrentParticipant);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (participant: TParticipant) => {
    dispatch(
      updateParticipant({
        companyId: companyId,
        participant: participant
      })
    );
    navigate(-1);
  };

  return (
    <EditParticipant
      currentParticipant={currentParticipant}
      onSubmit={handleSubmit}
    />
  );
};
