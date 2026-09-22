import { CommonCard } from '../../../shared/ui/common-card/CommonCard';
import type { TMeeting } from '../types/currentMeeting';

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
        'ID встречи': String(meeting.id),
        'Вид встречи': meeting.meetingType,
        'Город проведения собрания': meeting.town,
        'Адресс проведения собрания': meeting.address,
        'Дата собрания': String(meeting.dateOfMeeting),
        'Дата составления протокола': String(meeting.dateOfProtocol),
        'Начало регистрации Участников собрания': String(
          meeting.startOfRegistration
        ),
        'Окончание регистрации Участников собрания': String(
          meeting.endOfRegistration
        ),
        'Время начала собрания': String(meeting.startOfMeeting),
        'Время окончания собрания': String(meeting.endOfMeeting)
      }}
    />
  );
};
