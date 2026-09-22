import { z } from 'zod';
import { MEETING_TYPE } from '../../../shared/utils/meetingTypes';

export const meetingSchema = z.object({
  id: z.number().optional(),
  dateOfMeeting: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  dateOfProtocol: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  startOfRegistration: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  endOfRegistration: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  startOfMeeting: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  endOfMeeting: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  town: z.string('Необходимо указать город проведения собрания'),
  address: z.string('Необходимо указать адрес проведения собрания'),
  secretaryId: z.string('Необходимо выбрать секретаря собрания'),
  chairmanId: z.string('Необходимо выбрать председателя собрания'),
  meetingType: z.enum(MEETING_TYPE, 'Вид собрания должен быть выбран'),
  companyId: z.string('Необходимо выбрать компанию')
});
