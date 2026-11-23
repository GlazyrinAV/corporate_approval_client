import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import { PARTICIPANT_TYPE } from '../../../shared/utils/participantTypes';
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
        data: [
          { fieldLabel: 'ФИО', fieldValue: participant.name },
          {
            fieldLabel: 'Дата рождения',
            fieldValue: String(participant.dateOfBirth)
          },
          {
            fieldLabel: 'Документ удостоверяющий личность',
            fieldValue: participant.idDocument
          },
          {
            fieldLabel: 'Данные документа',
            fieldValue: participant.idDocumentData
          },
          {
            fieldLabel: 'Адрес регистрации',
            fieldValue: participant.registrationAddress
          },
          {
            fieldLabel: 'Номинальная доля в уставном капитале',
            fieldValue: String(participant.nominalShare)
          },
          {
            fieldLabel: 'Фактическая доля',
            fieldValue: String(participant.share)
          },
          {
            fieldLabel: 'Тип участника',
            fieldValue: PARTICIPANT_TYPE[participant.participantType]
          },
          {
            fieldLabel: 'Активен',
            fieldValue: participant.isActive ? 'Да' : 'Нет'
          }
        ]
      }}
    />
  );
};
