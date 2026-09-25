import { zodResolver } from '@hookform/resolvers/zod';
import { meetingSchema } from '../../features/meeting/schema/meetingSchema';
import type { TMeeting } from '../../features/meeting/types/currentMeeting';
import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler
} from 'react-hook-form';
import styles from './MeetingEditForm.module.css';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { findType, MEETING_TYPE } from '../../shared/utils/meetingTypes';
import { RadioSelector } from '../../shared/ui/radio-selector/RadioSelector';
import { DatePickerBasic } from '../../shared/ui/date-picker/DatePickerBasic';
import { FormInput } from '../../shared/ui/input/FormInput';
import { TimePickerBasic } from '../../shared/ui/time-picker/TimePickerBasic';
import dayjs from 'dayjs';
import type { TNewMeeting } from '../../features/meeting/types/newMeeting';

type MeetingEditFormProps = {
  currentMeeting?: TMeeting;
  companyId: number;
  onSubmit: (meeting: TMeeting) => void;
};

export const MeetingEditForm = ({
  currentMeeting,
  onSubmit,
  companyId
}: MeetingEditFormProps) => {
  const { handleSubmit, control, register } = useForm<TMeeting | TNewMeeting>({
    resolver: zodResolver(meetingSchema)
  });

  const submit: SubmitHandler<TMeeting> = (data) => {
    onSubmit({
      ...data,
      id: currentMeeting?.id || null
    });
  };

  const onInvalid: SubmitErrorHandler<TMeeting> = (errors) => {
    console.error('Validation errors:', errors);
  };

  return (
    <form className={styles.edit_form}>
      <Controller
        name='meetingType'
        control={control}
        defaultValue={
          currentMeeting ? findType(currentMeeting.meetingType) : null
        }
        render={({ field, fieldState: { error } }) => (
          <RadioSelector
            {...field}
            id='meetingType'
            options={[
              {
                value: MEETING_TYPE['FMP'],
                label: 'Общее собрание участников'
              },
              {
                value: MEETING_TYPE['FMS'],
                label: 'Общее собрание акционеров'
              },
              {
                value: MEETING_TYPE['BOD'],
                label: 'Совет директоров'
              }
            ]}
            row
            label='Вид собрания'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />

      <Controller
        name='dateOfMeeting'
        control={control}
        defaultValue={
          currentMeeting ? new Date(currentMeeting.dateOfMeeting) : null
        }
        render={({ field, fieldState: { error } }) => (
          <DatePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Дата собрания'
            errorMessage={error?.message}
            errorState={!!error}
          />
        )}
      />

      <Controller
        name='dateOfProtocol'
        control={control}
        defaultValue={
          currentMeeting ? new Date(currentMeeting.dateOfProtocol) : null
        }
        render={({ field, fieldState: { error } }) => (
          <DatePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Дата составления протокола'
            errorMessage={error?.message}
            errorState={!!error}
          />
        )}
      />

      <Controller
        name='startOfRegistration'
        control={control}
        defaultValue={
          currentMeeting
            ? dayjs(currentMeeting.startOfRegistration, 'HH:mm').toDate()
            : null
        }
        render={({ field, fieldState: { error } }) => (
          <TimePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Время начала регистрации участников собрания'
            errorMessage={error?.message}
            errorState={!!error}
          />
        )}
      />

      <Controller
        name='endOfRegistration'
        control={control}
        defaultValue={
          currentMeeting
            ? dayjs(currentMeeting.endOfRegistration, 'HH:mm').toDate()
            : null
        }
        render={({ field, fieldState: { error } }) => (
          <TimePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Время окончания регистрации участников собрания'
            errorMessage={error?.message}
            errorState={!!error}
          />
        )}
      />

      <Controller
        name='startOfMeeting'
        control={control}
        defaultValue={
          currentMeeting
            ? dayjs(currentMeeting.startOfMeeting, 'HH:mm').toDate()
            : null
        }
        render={({ field, fieldState: { error } }) => (
          <TimePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Время начала собрания'
            errorMessage={error?.message}
            errorState={!!error}
          />
        )}
      />

      <Controller
        name='endOfMeeting'
        control={control}
        defaultValue={
          currentMeeting
            ? dayjs(currentMeeting.endOfMeeting, 'HH:mm').toDate()
            : null
        }
        render={({ field, fieldState: { error } }) => (
          <TimePickerBasic
            {...field}
            value={field.value ? new Date(field.value) : null}
            label='Время завершения собрания'
            errorMessage={error?.message}
            errorState={!!error}
          />
        )}
      />

      <Controller
        name='town'
        control={control}
        defaultValue={currentMeeting?.town}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label='Город проведения собрания'
            placeholder='Введите название города'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />

      <Controller
        name='address'
        control={control}
        defaultValue={currentMeeting?.address}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label='Адрес проведения собрания'
            placeholder='Введите адрес проведения собрания'
            error={error != null}
            helpText={error?.message}
          />
        )}
      />

      <input
        type='hidden'
        {...register('companyId')}
        value={companyId.toString()}
      />

      <CommonButton color='secondary' onClick={handleSubmit(submit, onInvalid)}>
        Сохранить собрание
      </CommonButton>
    </form>
  );
};
