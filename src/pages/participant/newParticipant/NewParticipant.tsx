import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useNavigate, useParams } from 'react-router';
import type { TNewParticipant } from '../../../features/participant/types/newParticipant';
import { saveParticipant } from '../../../features/participant/getParticipant/currentParticipant-slice';
import { EditParticipant } from '../../../features/participant/editParticipant/EditParticipant';

export const NewParticipant = () => {
  const params = useParams<{ companyId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const companyId = Number(params?.companyId);

  const handleSubmit = (participant: TNewParticipant) => {
    dispatch(
      saveParticipant({ companyId: companyId, participant: participant })
    );
    navigate(`/company/${companyId}/participants`);
  };

  return <EditParticipant onSubmit={handleSubmit} />;
};
