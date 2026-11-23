import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import {
  fetchPotentialMeetingParticipantsForCurrentMeeting,
  fetchPotentialMeetingParticipantsForNewMeeting,
  getIsPotentialLoading,
  getPotentionalMeetingParticpants,
  updateParticipantInPotentialList
} from '../../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { Pageable } from '../../../shared/ui/pageable/Pageable';

import {
  addToChosenList,
  fetchMeetingParticipants,
  getChosenMeetingParticipants,
  getIsCurrentLoading,
  getMeetingParticipants,
  removeFromChosenList,
  updateParticipantInChosenList
} from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import { useSelector, type AppDispatch } from '../../../app/store';
import styles from './MeetingParticipantEditForm.module.css';
import { NewMeetingParticipants } from '../../../widgets/newMeetingParticipant/NewMeetingParticipants';
import type { TMeetingParticipant } from '../../../features/meetingParticipant/types/currentMeetingParticipant';

type MeetingParticipantEditFormProps = {
  participantExceptions?: number[];
  meetingType?: string;
};

export const MeetingParticipantEditForm = ({
  meetingType,
  participantExceptions = []
}: MeetingParticipantEditFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ companyId: string; meetingId: string }>();
  const companyId = Number(params?.companyId);
  const meetingId = Number(params?.meetingId);
  const isPotentialLoading = useSelector(getIsPotentialLoading);
  const isCurrentLoading = useSelector(getIsCurrentLoading);
  const meetingParticipants = useSelector(getMeetingParticipants);
  const potentialMeetingParticipants = useSelector(
    getPotentionalMeetingParticpants
  );
  const chosenMeetingParticipants = useSelector(getChosenMeetingParticipants);

  const [pageCurrent, setPageCurrent] = useState(
    meetingParticipants?.number ?? 1
  );
  const [pagePotential, setPagePotential] = useState(
    potentialMeetingParticipants?.number ?? 1
  );

  // Получаем текущих участников
  useEffect(() => {
    if (meetingId) {
      dispatch(
        fetchMeetingParticipants({
          companyId,
          meetingId,
          page: pageCurrent
        })
      );
    }
  }, [dispatch, companyId, meetingId, pageCurrent]);

  // Получаем потенциальных участников
  useEffect(() => {
    if (meetingId) {
      dispatch(
        fetchPotentialMeetingParticipantsForCurrentMeeting({
          companyId,
          meetingId,
          page: pagePotential
        })
      );
    } else {
      if (meetingType) {
        dispatch(
          fetchPotentialMeetingParticipantsForNewMeeting({
            companyId,
            meetingType,
            page: pagePotential
          })
        );
      }
    }
  }, [dispatch, companyId, meetingId, pagePotential, meetingType]);

  // Добавляем участникам признак выбран или нет для формирования списка с
  const meetingParticipantsValues = useMemo(() => {
    return (
      meetingParticipants?.content
        ?.filter((item) => !participantExceptions.includes(item.participant.id))
        .map((item) => ({
          ...item,
          meetingId: meetingId ? meetingId : null,
          checked: true
        })) ?? []
    );
  }, [meetingParticipants, participantExceptions, meetingId]);

  const potentialMeetingParticipantsValues = useMemo(() => {
    return (
      potentialMeetingParticipants?.content
        ?.filter((item) => !participantExceptions.includes(item.participant.id))
        .map((item) => ({
          ...item,
          checked: false
        })) ?? []
    );
  }, [potentialMeetingParticipants, participantExceptions]);

  // Настройка пагинации
  const handlePageChangeCurrent = useCallback((value: number) => {
    setPageCurrent(value);
  }, []);

  const handlePageChangePotential = useCallback((value: number) => {
    setPagePotential(value);
  }, []);

  // Действие при выборе или отмены выбора
  const handleChangeChosen = (value: TMeetingParticipant) => {
    // Проверяем есть ли уже такой элемент в списке выбранных (-1 - не найден)
    const participantIndex = chosenMeetingParticipants.findIndex(
      (item) => item.participant.id === value.participant.id
    );

    // Если найден - удаляем из списка
    if (participantIndex >= 0) {
      dispatch(
        removeFromChosenList(
          chosenMeetingParticipants[participantIndex].participant.id
        )
      );
    } else {
      // Иначем добавлем с корректировкой поля тип участника
      dispatch(
        addToChosenList({
          ...value,
          meetingId: meetingId ? meetingId : null,
          participant: {
            ...value.participant
          }
        })
      );
    }
  };

  //Обработка изменения признака пристутствия участника на собрании
  const handleChangePresent = (value: TMeetingParticipant) => {
    // Проверяем есть ли уже такой элемент в списке выбранных (-1 - не найден)
    const participantIndex = chosenMeetingParticipants.findIndex(
      (item) => item.participant.id === value.participant.id
    );
    value.meetingId = meetingId ? meetingId : null;

    if (participantIndex >= 0) {
      dispatch(updateParticipantInChosenList(value));
    } else {
      dispatch(updateParticipantInPotentialList(value));
    }
  };

  return (
    <section className={styles.wraper}>
      {meetingParticipants ? (
        <div className={styles.main_section}>
          <span>Current Meeting Participants</span>
          {isCurrentLoading ? (
            <Preloader />
          ) : (
            <>
              <NewMeetingParticipants
                meetingParticipants={meetingParticipantsValues}
                onChangeChosen={handleChangeChosen}
                onChangePresent={handleChangePresent}
              />
              {meetingParticipants && meetingParticipants.totalPages > 1 && (
                <Pageable
                  count={meetingParticipants.totalPages}
                  page={pageCurrent}
                  onChange={handlePageChangeCurrent}
                  classname={styles.pagable}
                />
              )}
            </>
          )}
        </div>
      ) : null}
      <div className={styles.main_section}>
        <span>Potential Meeting Participants</span>
        {isPotentialLoading ? (
          <Preloader />
        ) : (
          <>
            <NewMeetingParticipants
              meetingParticipants={potentialMeetingParticipantsValues}
              onChangeChosen={handleChangeChosen}
              onChangePresent={handleChangePresent}
            />
            {potentialMeetingParticipants &&
              potentialMeetingParticipants.totalPages > 1 && (
                <Pageable
                  count={potentialMeetingParticipants.totalPages}
                  page={pagePotential}
                  onChange={handlePageChangePotential}
                  classname={styles.pagable}
                />
              )}
          </>
        )}
      </div>
    </section>
  );
};
