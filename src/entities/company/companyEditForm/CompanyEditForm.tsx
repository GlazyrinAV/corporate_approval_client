import { FormInput } from '../../../shared/ui/input/FormInput';
import styles from './CompanyEditForm.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { RadioSelector } from '../../../shared/ui/radio-selector/RadioSelector';
import { Switcher } from '../../../shared/ui/switcher/Switcher';
import type { TCompany } from '../../../features/company/types/currentCompany';
import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler
} from 'react-hook-form';
import { companySchema } from '../../../features/company/schema/companySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TNewCompany } from '../../../features/company/types/newCompany';

type CompanyEditFormProps = {
  currentCompany?: TCompany;
  onSubmit: (company: TCompany) => void;
};

export const EditCompanyForm = ({
  currentCompany,
  onSubmit
}: CompanyEditFormProps) => {
  const { handleSubmit, control } = useForm<TCompany | TNewCompany>({
    resolver: zodResolver(companySchema)
  });

  const submit: SubmitHandler<TCompany> = (data) => {
    onSubmit({
      ...data,
      id: currentCompany?.id || null
    });
  };

  const onInvalid: SubmitErrorHandler<TCompany> = (errors) => {
    console.error('Validation errors:', errors);
  };

  return (
    <form className={styles.edit_form}>
      <Controller
        name='title'
        control={control}
        defaultValue={currentCompany?.title}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label='Название компании'
            placeholder='Введите название компании'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='inn'
        control={control}
        defaultValue={currentCompany?.inn.toString()}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            value={field.value ? String(field.value) : ''}
            label='ИНН'
            placeholder='Введите ИНН'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='registrationNumber'
        control={control}
        defaultValue={currentCompany?.registrationNumber.toString()}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            value={field.value ? String(field.value) : ''}
            label='ОГРН'
            placeholder='Введите ОГРН'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='hasBoardOfDirectors'
        control={control}
        defaultValue={
          currentCompany ? currentCompany?.hasBoardOfDirectors : false
        }
        render={({ field }) => <Switcher {...field} label='Совет директоров' />}
      />
      <Controller
        name='companyType'
        control={control}
        defaultValue={currentCompany?.companyType ?? 'LLC'}
        render={({ field, fieldState: { error } }) => (
          <RadioSelector
            {...field}
            id='CompanyOrganizationForm'
            options={[
              {
                value: 'LLC',
                label: 'ООО'
              },
              {
                value: 'JSC',
                label: 'АО'
              }
            ]}
            row
            label='Организационная форма'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />

      <CommonButton color='secondary' onClick={handleSubmit(submit, onInvalid)}>
        Сохранить компанию
      </CommonButton>
    </form>
  );
};
