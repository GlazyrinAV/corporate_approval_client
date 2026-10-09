import { z } from 'zod';
import { MEETING_TYPE } from '../../../shared/utils/meetingTypes';

export const meetingSchema = z.object({
  id: z.number().nullable(),
  dateOfMeeting: z.date('Необходимо указать дату собрания'),
  dateOfProtocol: z.date('Необходимо указать дату составления протокола'),
  startOfRegistration: z.date(
    'Необходимо указать время начала регистрации участников собрания'
  ),
  endOfRegistration: z.date(
    'Необходимо указать время окончания регистрации участников собрания'
  ),
  startOfMeeting: z.date('Необходимо указать время начала собрания'),
  endOfMeeting: z.date('Необходимо указать время завершения собрания'),
  town: z.string('Необходимо указать город проведения собрания'),
  address: z.string('Необходимо указать адрес проведения собрания'),
  secretaryId: z.string('Необходимо выбрать секретаря собрания'),
  chairmanId: z.string('Необходимо выбрать председателя собрания'),
  meetingType: z.enum(MEETING_TYPE, 'Вид собрания должен быть выбран'),
  companyId: z.string('Необходимо выбрать компанию'),
  meetingParticipants: z
    .array(
      z.object({
        participantId: z.number('Необходимо указать ID участника'),
        isPresent: z.boolean(
          'Необходимо указать факт присутствия участника на собрании'
        )
      })
    )
    .optional()
});
