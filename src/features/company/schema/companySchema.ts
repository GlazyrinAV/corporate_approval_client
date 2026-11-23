import { z } from 'zod';
import { COMPANY_TYPE } from '../../../shared/utils/companyTypes';
import type { CompanyTypeKey } from '../../../shared/utils/companyTypes';

export const companySchema = z.object({
  id: z.number().optional(),
  title: z
    .string('Необходимо указать название компании')
    .min(3, 'Минимальный размер составляет 3 символа'),
  inn: z
    .string('Необходимо указать ИНН компании')
    .min(10, 'ИНН содержит 10 цифр')
    .max(10, 'ИНН содержит 10 цифр')
    .regex(/^\d+$/, 'ИНН должен содержать только цифры'),
  registrationNumber: z
    .string('Необходимо указать ОГРН компании')
    .min(13, 'ОГРН содержит 13 цифр')
    .max(13, 'ОГРН содержит 13 цифр')
    .regex(/^\d+$/, 'ИНН должен содержать только цифры'),
  companyType: z.enum(
    Object.keys(COMPANY_TYPE) as [CompanyTypeKey, ...CompanyTypeKey[]],
    'Вид компании должен быть выбран'
  ),
  hasBoardOfDirectors: z.boolean(
    'Необходоимо указать наличие Совета директоров'
  )
});
