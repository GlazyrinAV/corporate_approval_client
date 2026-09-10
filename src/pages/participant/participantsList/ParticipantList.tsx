import { useNavigate, useParams } from 'react-router';
import { PartcipantsInfo } from '../../../features/participant/getAll/ParticipantsInfo';
import styles from './ParticipantList.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';

export const ParticipantList = () => {
  const navigate = useNavigate();
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);

  const handleClick = (participantId: number) => {
    navigate(`/company/${companyId}/participants/${participantId}`);
  };

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton onClick={() => navigate(`/company/${companyId}`)}>
          Back
        </CommonButton>
        <CommonButton
          color='secondary'
          onClick={() => navigate(`/company/${companyId}/participants/new`)}
        >
          Add Participant
        </CommonButton>
      </div>
      <PartcipantsInfo
        companyId={Number(companyId)}
        onClick={(id) => handleClick(id)}
      />
    </section>
  );
};
