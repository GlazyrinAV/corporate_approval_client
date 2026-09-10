import { useNavigate, useParams } from 'react-router';
import styles from './CurrentParticipant.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import {
  fetchParticipantById,
  getCurrentParticipant,
  removeParticipant
} from '../../../features/participant/getParticipant/currrentParticipant-slice';
import {
  fetchParticipants,
  getIsLoading
} from '../../../features/participant/getAll/participants-slice';
import { ParticipantInfo } from '../../../features/participant/getParticipant/ParticipantInfo';
import { useEffect } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';

export const CurrentParticipant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string; participantId?: string }>();
  const companyId = Number(params?.companyId);
  const participantId = Number(params?.participantId);
  const participant = useSelector(getCurrentParticipant);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(
      fetchParticipantById({
        companyId: companyId,
        participantId: participantId
      })
    );
  }, [dispatch, companyId, participantId]);

  const handleDelete = () => {
    dispatch(
      removeParticipant({
        companyId: companyId,
        participantId: participantId
      })
    );
    dispatch(fetchParticipants({ companyId: companyId, page: 1 }));
    navigate(`/company/${companyId}/participants`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <CommonButton
          onClick={() => navigate(`/company/${companyId}/participants`)}
        >
          Back
        </CommonButton>
      </div>
      <div className={styles.actions}>
        <CommonButton
          color='secondary'
          onClick={() =>
            navigate(
              `/company/${companyId}/participants/{${participantId}/edit`
            )
          }
        >
          Edit Participant
        </CommonButton>
        <CommonButton color='error' onClick={handleDelete}>
          Delete Participant
        </CommonButton>
      </div>
      <section>
        {isLoading ? (
          <Preloader />
        ) : participant ? (
          <ParticipantInfo participant={participant} />
        ) : (
          'Данные отсутствуют'
        )}
      </section>
    </div>
  );
};
