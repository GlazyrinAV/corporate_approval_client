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
import {
  findMeetingTypeValue,
  MEETING_TYPE
} from '../../shared/utils/meetingTypes';
import { RadioSelector } from '../../shared/ui/radio-selector/RadioSelector';
import { DatePickerBasic } from '../../shared/ui/date-picker/DatePickerBasic';
import { FormInput } from '../../shared/ui/input/FormInput';
import { TimePickerBasic } from '../../shared/ui/time-picker/TimePickerBasic';
import dayjs from 'dayjs';
import type { TNewMeeting } from '../../features/meeting/types/newMeeting';
import { useDispatch, useSelector } from 'react-redux';
import {
  getForm,
  setFormValue
} from '../../features/meeting/editMeeting/EditMeeting-slice';
import { useEffect } from 'react';
import {
  fetchPotentialMeetingParticipantsForNewMeeting,
  getPotentionalMeetingParticpants
} from '../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import type { AppDispatch } from '../../app/store';
import { Link, useParams } from 'react-router';
import { MeetingParticipantEditForm } from '../meetingParticipant/meetingParticipantEditForm/MeetingParticipantEditForm';
import {
  fetchMeetingParticipants,
  getChosenMeetingParticipants,
  getMeetingParticipants
} from '../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import type { TMeetingParticipant } from '../../features/meetingParticipant/types/currentMeetingParticipant';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
type MeetingEditFormProps = {
  currentMeeting?: TMeeting;
  onSubmit: (meeting: TMeeting) => void;
};

export const MeetingEditForm = ({
  currentMeeting,
  onSubmit
}: MeetingEditFormProps) => {
  const { form } = useSelector(getForm);
  const {
    meetingType,
    dateOfMeeting,
    dateOfProtocol,
    startOfRegistration,
    endOfRegistration,
    startOfMeeting,
    endOfMeeting,
    town,
    address,
    secretaryId,
    chairmanId
  } = form;
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params.companyId);
  const potentialParticipants = useSelector(getPotentionalMeetingParticpants);
  const currentParticipants = useSelector(getMeetingParticipants);
  const secretary = findSecretary();
  const chairman = findChairman();
  const meetingParticipants = useSelector(getChosenMeetingParticipants);

  function findSecretary(): TMeetingParticipant {
    let secretary = null;
    if (currentMeeting && currentMeeting.secretaryId) {
      secretary = currentParticipants?.content?.find(
        (participant) => participant.id === Number(currentMeeting.secretaryId)
      );
    } else if (secretaryId != null) {
      if (currentParticipants) {
        secretary = currentParticipants?.content?.find(
          (participant) => participant.participant.id === Number(secretaryId)
        );
      }
      console.log(secretary)
      if (!secretary) {
        secretary = potentialParticipants?.content?.find(
          (participant) => participant.participant.id === Number(secretaryId)
        );
      }
    }
    return secretary;
  }

  function findChairman(): TMeetingParticipant {
    let chairman = null;
    if (currentMeeting != null && currentMeeting.chairmanId != null) {
      chairman = currentParticipants?.content?.find(
        (participant) => participant.id === Number(currentMeeting.chairmanId)
      );
    } else if (chairmanId) {
      if (currentParticipants) {
        chairman = currentParticipants?.content?.find(
          (participant) => participant.participant.id === Number(chairmanId)
        );
      }
      if (!chairman) {
        chairman = potentialParticipants?.content?.find(
          (participant) => participant.participant.id === Number(chairmanId)
        );
      }
    }
    return chairman;
  }

  useEffect(() => {
    if (currentMeeting)
      dispatch(
        fetchMeetingParticipants({
          companyId,
          meetingId: currentMeeting.id,
          page: null
        })
      );

    if (meetingType) {
      dispatch(setFormValue({ field: 'companyId', value: companyId }));
      dispatch(
        fetchPotentialMeetingParticipantsForNewMeeting({
          companyId,
          meetingType
        })
      );
    }
  }, [dispatch, meetingType, currentMeeting, companyId]);

  const { handleSubmit, control, register } = useForm<TMeeting | TNewMeeting>({
    resolver: zodResolver(meetingSchema),
    mode: 'onSubmit',
    values: {
      ...form,
      companyId: companyId.toString(),
      dateOfMeeting: dayjs(dateOfMeeting).toDate(),
      dateOfProtocol: dayjs(dateOfProtocol).toDate(),
      startOfRegistration: dayjs(startOfRegistration).toDate(),
      endOfRegistration: dayjs(endOfRegistration).toDate(),
      startOfMeeting: dayjs(startOfMeeting).toDate(),
      endOfMeeting: dayjs(endOfMeeting).toDate(),
      secretaryId: secretaryId?.toString(),
      chairmanId: chairmanId?.toString(),
      meetingParticipants: meetingParticipants.map((participant) => ({
        participantId: participant.participant.id,
        isPresent: participant.isPresent
      }))
    }
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

  const handleMeetingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue({ field: 'meetingType', value: e.target.value }));
  };

  const handleDateOfMeetingChange = (date: Date) => {
    dispatch(
      setFormValue({
        field: 'dateOfMeeting',
        value: dayjs(date).toISOString()
      })
    );
  };

  const handleDateOfProtocolChange = (date: Date) => {
    dispatch(
      setFormValue({
        field: 'dateOfProtocol',
        value: dayjs(date).toISOString()
      })
    );
  };

  const handleStartOfRegistrationChange = (date: Date) => {
    dispatch(
      setFormValue({
        field: 'startOfRegistration',
        value: dayjs(date, 'HH:mm:ss.SSS').toISOString()
      })
    );
  };

  const handleEndOfRegistrationChange = (date: Date) => {
    dispatch(
      setFormValue({
        field: 'endOfRegistration',
        value: dayjs(date, 'HH:mm:ss.SSS').toISOString()
      })
    );
  };

  const handleStartOfMeetingChange = (date: Date) => {
    dispatch(
      setFormValue({
        field: 'startOfMeeting',
        value: dayjs(date, 'HH:mm:ss.SSS').toISOString()
      })
    );
  };

  const handleEndOfMeetingChange = (date: Date) => {
    dispatch(
      setFormValue({
        field: 'endOfMeeting',
        value: dayjs(date, 'HH:mm:ss.SSS').toISOString()
      })
    );
  };

  const handleTownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue({ field: 'town', value: e.target.value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue({ field: 'address', value: e.target.value }));
  };

  const getParticipantExceptions = (): number[] => {
    const participantExceptions = [];
    if (chairmanId) {
      participantExceptions.push(chairmanId);
    }

    if (secretaryId) {
      participantExceptions.push(secretaryId);
    }
    return participantExceptions;
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.edit_form}>
        <Controller
          name='meetingType'
          control={control}
          defaultValue={findMeetingTypeValue(meetingType)}
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
              onChange={handleMeetingTypeChange}
            />
          )}
        />

        <Controller
          name='dateOfMeeting'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePickerBasic
              {...field}
              value={dateOfMeeting}
              label='Дата собрания'
              errorMessage={error?.message}
              errorState={!!error}
              onChange={handleDateOfMeetingChange}
            />
          )}
        />

        <Controller
          name='dateOfProtocol'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePickerBasic
              {...field}
              value={dateOfProtocol}
              label='Дата составления протокола'
              errorMessage={error?.message}
              errorState={!!error}
              onChange={handleDateOfProtocolChange}
            />
          )}
        />

        <Controller
          name='startOfRegistration'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TimePickerBasic
              {...field}
              value={startOfRegistration}
              label='Время начала регистрации участников собрания'
              errorMessage={error?.message}
              errorState={!!error}
              onChange={handleStartOfRegistrationChange}
            />
          )}
        />

        <Controller
          name='endOfRegistration'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TimePickerBasic
              {...field}
              value={endOfRegistration}
              label='Время окончания регистрации участников собрания'
              errorMessage={error?.message}
              errorState={!!error}
              onChange={handleEndOfRegistrationChange}
            />
          )}
        />

        <Controller
          name='startOfMeeting'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TimePickerBasic
              {...field}
              value={startOfMeeting}
              label='Время начала собрания'
              errorMessage={error?.message}
              errorState={!!error}
              onChange={handleStartOfMeetingChange}
            />
          )}
        />

        <Controller
          name='endOfMeeting'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TimePickerBasic
              {...field}
              value={endOfMeeting}
              label='Время завершения собрания'
              errorMessage={error?.message}
              errorState={!!error}
              onChange={handleEndOfMeetingChange}
            />
          )}
        />

        <Controller
          name='town'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormInput
              {...field}
              value={town}
              label='Город проведения собрания'
              placeholder='Введите название города'
              error={error != null}
              helpText={error?.message}
              onChange={handleTownChange}
            />
          )}
        />

        <Controller
          name='address'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormInput
              {...field}
              value={address}
              label='Адрес проведения собрания'
              placeholder='Введите адрес проведения собрания'
              error={error != null}
              helpText={error?.message}
              onChange={handleAddressChange}
            />
          )}
        />

        <div className={styles.information}>
          <span>Председатель собрания:</span>
          <span>
            {chairman ? chairman?.participant.name : 'Председатель не выбран'}
          </span>
          {meetingType ? (
            <Link
              to={`/company/${companyId}/meetings/new/chairman`}
              state={{
                meetingType,
                companyId,
                meetingId: currentMeeting ? currentMeeting.id : null
              }}
            >
              <CommonButton>Изменить председателя</CommonButton>
            </Link>
          ) : (
            'Необходимо выбрать вид собрани'
          )}
        </div>

        <div className={styles.information}>
          <span>Секретарь собрания:</span>
          <span>
            {secretary ? secretary?.participant.name : 'Секретарь не выбран'}
          </span>
          {meetingType ? (
            <Link
              to={`/company/${companyId}/meetings/new/secretary`}
              state={{
                meetingType,
                companyId,
                meetingId: currentMeeting ? currentMeeting.id : null
              }}
            >
              <CommonButton>Изменить секретаря</CommonButton>
            </Link>
          ) : (
            'Необходимо выбрать вид собрани'
          )}
        </div>

        <input type='hidden' {...register('companyId')} value={companyId} />

        <CommonButton
          color='secondary'
          onClick={handleSubmit(submit, onInvalid)}
        >
          Сохранить собрание
        </CommonButton>
      </form>
      <div className={styles.second_colomn}>
        <MeetingParticipantEditForm
          meetingType={meetingType}
          participantExceptions={getParticipantExceptions()}
        />
      </div>
    </div>
  );
};
