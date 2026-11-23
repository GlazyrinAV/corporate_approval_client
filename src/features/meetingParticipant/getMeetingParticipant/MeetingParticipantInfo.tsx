import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import { findType } from '../../../shared/utils/participantTypes';
import type { TMeetingParticipant } from '../types/currentMeetingParticipant';

type MeetingParticipantInfoProps = {
  meetingParticipant: TMeetingParticipant;
};

export const MeetingParticipantInfo = ({
  meetingParticipant
}: MeetingParticipantInfoProps) => {
  const participant = meetingParticipant.participant;

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
            fieldLabel: 'Тип учатника',
            fieldValue: findType(participant.participantType)
          },
          {
            fieldLabel: 'Присутствует на собрании',
            fieldValue: meetingParticipant.isPresent
              ? 'Присутствует'
              : 'Отсутствует'
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
