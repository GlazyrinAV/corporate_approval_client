import { FormInput } from '../../../shared/ui/input/FormInput';
import styles from './ParticipantEditForm.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { RadioSelector } from '../../../shared/ui/radio-selector/RadioSelector';
import { Switcher } from '../../../shared/ui/switcher/Switcher';
import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TParticipant } from '../../../features/participant/types/currentParticipant';
import { participantSchema } from '../../../features/participant/schema/participantSchema';
import { DatePickerBasic } from '../../../shared/ui/date-picker/DatePickerBasic';
import {
  findType,
  PARTICIPANT_TYPE
} from '../../../shared/utils/participantTypes';
import type { TNewParticipant } from '../../../features/participant/types/newParticipant';

type ParticipantEditFormProps = {
  currentParticipant?: TParticipant;
  companyId: number;
  onSubmit: (participant: TParticipant) => void;
};

export const EditParticipantForm = ({
  currentParticipant,
  onSubmit,
  companyId
}: ParticipantEditFormProps) => {
  const { handleSubmit, control, register } = useForm<
    TParticipant | TNewParticipant
  >({
    resolver: zodResolver(participantSchema)
  });

  const submit: SubmitHandler<TParticipant> = (data) => {
    onSubmit({
      ...data,
      id: currentParticipant?.id || null
    });
  };

  const onInvalid: SubmitErrorHandler<TParticipant> = (errors) => {
    console.error('Validation errors:', errors);
  };

  return (
    <form className={styles.edit_form}>
      <Controller
        name='name'
        control={control}
        defaultValue={currentParticipant?.name}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label='ФИО участника'
            placeholder='Введите ФИО участника'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='dateOfBirth'
        control={control}
        defaultValue={
          currentParticipant ? new Date(currentParticipant.dateOfBirth) : null
        }
        render={({ field, fieldState: { error } }) => (
          <DatePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Дата рождения'
            errorMessage={error?.message}
            errorState={!!error}
            disableFuture
          />
        )}
      />
      <Controller
        name='idDocument'
        control={control}
        defaultValue={currentParticipant?.idDocument}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            value={field.value ? field.value : ''}
            label='Вид документа удостоверяющего личность'
            placeholder='Введите вид документа удостоверяющего личность'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='idDocumentData'
        control={control}
        defaultValue={currentParticipant?.idDocumentData}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            value={field.value ? field.value : ''}
            label='Реквизиты документа удостоверяющего личность'
            placeholder='Введите реквизиты документа удостоверяющего личность'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='registrationAddress'
        control={control}
        defaultValue={currentParticipant?.registrationAddress}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            value={field.value ? field.value : ''}
            label='Адрес регистрации'
            placeholder='Введите адрес регистрации'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='nominalShare'
        control={control}
        defaultValue={currentParticipant?.nominalShare.toString()}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            type='number'
            value={field.value ? String(field.value) : ''}
            label='Номинальная доля'
            placeholder='Введите номинальную долю'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='share'
        control={control}
        defaultValue={currentParticipant?.share.toString()}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            type='number'
            value={field.value ? field.value : ''}
            label='Доля'
            placeholder='Введите доля'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='participantType'
        control={control}
        defaultValue={
          currentParticipant
            ? findType(currentParticipant.participantType)
            : null
        }
        render={({ field, fieldState: { error } }) => (
          <RadioSelector
            {...field}
            id='participantType'
            options={[
              {
                value: PARTICIPANT_TYPE['OWNER'],
                label: 'Собственник'
              },
              {
                value: PARTICIPANT_TYPE['MEMBER_OF_BOARD'],
                label: 'Член совета директоров'
              }
            ]}
            row
            label='Вид участника'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />
      <Controller
        name='isActive'
        control={control}
        defaultValue={currentParticipant ? currentParticipant?.isActive : true}
        render={({ field }) => (
          <Switcher {...field} label='Активный участник' />
        )}
      />

      <input
        type='hidden'
        {...register('companyId')}
        value={companyId ? companyId.toString() : null}
      />

      <CommonButton color='secondary' onClick={handleSubmit(submit, onInvalid)}>
        Сохранить участника
      </CommonButton>
    </form>
  );
};
