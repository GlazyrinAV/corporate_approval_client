import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import { findType } from '../../../shared/utils/participantTypes';
import type { TParticipant } from '../types/currentParticipant';

type ParticipantInfoProps = {
  participant: TParticipant;
};

export const ParticipantInfo = ({ participant }: ParticipantInfoProps) => {
  return (
    <CommonCard
      key={participant.id}
      title='Информация об участнике'
      row
      content={{
        ФИО: participant.name,
        'Дата рождения': String(participant.dateOfBirth),
        'Документ удостоверяющий личность': participant.idDocument,
        'Данные документа': participant.idDocumentData,
        'Адрес регистрации': participant.registrationAddress,
        'Номинальная доля в уставном капитале': String(
          participant.nominalShare
        ),
        'Фактическая доля': String(participant.share),
        'Тип учатника': findType(participant.participantType),
        Активен: participant.isActive ? 'Да' : 'Нет'
      }}
    />
  );
};
