import dayjs from 'dayjs';
import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import type { TMeeting } from '../types/currentMeeting';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type MeetingInfoProps = {
  meeting: TMeeting;
};

export const MeetingInfo = ({ meeting }: MeetingInfoProps) => {
  return (
    <CommonCard
      key={meeting.id}
      title='Информация о встрече'
      row
      content={{
        data: [
          { fieldLabel: 'ID встречи', fieldValue: String(meeting.id) },
          {
            fieldLabel: 'Вид встречи',
            fieldValue: meeting.meetingType
          },
          {
            fieldLabel: 'Город проведения собрания',
            fieldValue: meeting.town
          },
          {
            fieldLabel: 'Адресс проведения собрания',
            fieldValue: meeting.address
          },
          {
            fieldLabel: 'Дата собрания',
            fieldValue: dayjs(meeting.dateOfMeeting).format('DD-MM-YYYY')
          },
          {
            fieldLabel: 'Дата составления протокола',
            fieldValue: dayjs(meeting.dateOfProtocol).format('DD-MM-YYYY')
          },
          {
            fieldLabel: 'Начало регистрации Участников собрания',
            fieldValue: dayjs(
              meeting.startOfRegistration,
              'HH:mm:ss.SSS'
            ).format('HH:mm')
          },
          {
            fieldLabel: 'Окончание регистрации Участников собрания',
            fieldValue: dayjs(meeting.endOfRegistration, 'HH:mm:ss.SSS').format(
              'HH:mm'
            )
          },
          {
            fieldLabel: 'Время начала собрания',
            fieldValue: dayjs(meeting.startOfMeeting, 'HH:mm:ss.SSS').format(
              'HH:mm'
            )
          },
          {
            fieldLabel: 'Время окончания собрания',
            fieldValue: dayjs(meeting.endOfMeeting, 'HH:mm:ss.SSS').format(
              'HH:mm'
            )
          }
        ]
      }}
    />
  );
};
