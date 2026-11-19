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
        'ID встречи': String(meeting.id),
        'Вид встречи': meeting.meetingType,
        'Город проведения собрания': meeting.town,
        'Адресс проведения собрания': meeting.address,
        'Дата собрания': dayjs(meeting.dateOfMeeting).format('DD-MM-YYYY'),
        'Дата составления протокола': dayjs(meeting.dateOfProtocol).format(
          'DD-MM-YYYY'
        ),
        'Начало регистрации Участников собрания': dayjs(
          meeting.startOfRegistration,
          'HH:mm:ss.SSS'
        ).format('HH:mm'),
        'Окончание регистрации Участников собрания': dayjs(
          meeting.endOfRegistration,
          'HH:mm:ss.SSS'
        ).format('HH:mm'),
        'Время начала собрания': dayjs(
          meeting.startOfMeeting,
          'HH:mm:ss.SSS'
        ).format('HH:mm'),
        'Время окончания собрания': dayjs(
          meeting.endOfMeeting,
          'HH:mm:ss.SSS'
        ).format('HH:mm')
      }}
    />
  );
};
