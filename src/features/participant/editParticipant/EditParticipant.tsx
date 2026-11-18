import { useNavigate, useParams } from 'react-router';
import styles from './EditParticipant.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import type { TParticipant } from '../types/currentParticipant';
import { EditParticipantForm } from '../../../entities/participant/participantEditForm/ParticipantEditForm';
import { routeBuilders } from '../../../app/routes';

type EditParticipantProps = {
  currentParticipant?: TParticipant;
  onSubmit?: (participant: TParticipant) => void;
};

export const EditParticipant = ({
  currentParticipant,
  onSubmit
}: EditParticipantProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.actions}>
        <CommonButton
          onClick={() => navigate(routeBuilders.participants({ companyId }))}
        >
          Back
        </CommonButton>
      </div>
      <div className={styles.content}>
        <EditParticipantForm
          currentParticipant={currentParticipant}
          companyId={companyId}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};
