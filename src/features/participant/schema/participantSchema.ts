import { z } from 'zod';
import { PARTICIPANT_TYPE } from '../../../shared/utils/participantTypes';

export const participantSchema = z.object({
  id: z.number().optional(),
  name: z.string('Необходимо указать имя'),
  dateOfBirth: z
    .date('Необходимо указать дату рождения')
    .min(new Date('01-01-1900'), 'Дата не может быть раньше чем 01.01.1900')
    .max(new Date(), `Указана дата в будущем`),
  idDocument: z.string('Необходимо указать вид документа'),
  idDocumentData: z.string('Необходимо заполнить данные о документе'),
  registrationAddress: z.string('Необходимо указать адрес регистрации'),
  nominalShare: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z
        .number('Необходимо указать номинальную долю')
        .max(100, 'Значение доли не должно быть больше 100%')
        .min(0, 'Значение доли не может быть отрицательным')
        .nonoptional()
        .transform((val) => String(val))
    ),
  share: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z
        .number('Необходимо указать номинальную долю')
        .max(100, 'Значение доли не должно быть больше 100%')
        .min(0, 'Значение доли не может быть отрицательным')
        .nonoptional()
    )
    .transform((val) => String(val)),
  companyId: z.string('Необходимо выбрать компанию'),
  participantType: z.enum(PARTICIPANT_TYPE, 'Вид участника должен быть выбран'),
  isActive: z.boolean('необходимо отметить актуальность участника')
});
