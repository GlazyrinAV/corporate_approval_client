import { useNavigate, useParams } from 'react-router';
import type { TMeeting } from '../types/currentMeeting';
import styles from './EditMeeting.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { MeetingEditForm } from '../../../entities/meeting/MeetingEditForm';
import { routeBuilders } from '../../../app/routes';

type EditMeetingProps = {
  currentMeeting?: TMeeting;
  onSubmit?: (participant: TMeeting) => void;
};

export const EditMeeting = ({ currentMeeting, onSubmit }: EditMeetingProps) => {
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params?.companyId);
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.actions}>
        <CommonButton
          onClick={() =>
            currentMeeting
              ? navigate(
                  routeBuilders.currentMeeting({
                    companyId,
                    meetingId: currentMeeting.id
                  })
                )
              : navigate(routeBuilders.meetings({ companyId }))
          }
        >
          Back
        </CommonButton>
      </div>
      <div className={styles.content}>
        <MeetingEditForm currentMeeting={currentMeeting} onSubmit={onSubmit} />
      </div>
    </section>
  );
};
