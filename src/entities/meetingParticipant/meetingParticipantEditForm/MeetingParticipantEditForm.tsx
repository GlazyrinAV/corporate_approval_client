import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import {
  fetchPotentialMeetingParticipants,
  getIsPotentialLoading,
  getPotentionalMeetingParticpants,
  updateParticipantInPotentialList
} from '../../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import { findParticipantTypeLabel } from '../../../shared/utils/participantTypes';
import {
  addToChosenList,
  fetchMeetingParticipants,
  getChosenMeetingParticipants,
  getIsCurrentLoading,
  getMeetingParticipants,
  removeFromChosenList,
  saveMeetingParticipants,
  updateParticipantInChosenList
} from '../../../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import { useSelector, type AppDispatch } from '../../../app/store';
import styles from './MeetingParticipantEditForm.module.css';
import { NewMeetingParticipants } from '../../../widgets/newMeetingParticipant/NewMeetingParticipants';
import type { TMeetingParticipant } from '../../../features/meetingParticipant/types/currentMeetingParticipant';

export const MeetingParticipantEditForm = () => {
  const navigate = useNavigate();
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
    dispatch(
      fetchMeetingParticipants({
        companyId,
        meetingId,
        page: pageCurrent
      })
    );
  }, [dispatch, companyId, meetingId, pageCurrent]);

  // Получаем потенциальных участников
  useEffect(() => {
    dispatch(
      fetchPotentialMeetingParticipants({
        companyId,
        meetingId,
        page: pagePotential
      })
    );
  }, [dispatch, companyId, meetingId, pagePotential]);

  // Добавляем участникам признак выбран или нет для формирования списка с
  const meetingParticipantsValues = useMemo(() => {
    return (
      meetingParticipants?.content?.map((item) => ({
        ...item,
        checked: true
      })) ?? []
    );
  }, [meetingParticipants]);

  const potentialMeetingParticipantsValues = useMemo(() => {
    return (
      potentialMeetingParticipants?.content?.map((item) => ({
        ...item,
        checked: false
      })) ?? []
    );
  }, [potentialMeetingParticipants]);

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
          participant: {
            ...value.participant,
            participantType: findParticipantTypeLabel(
              value.participant.participantType
            )
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

    if (participantIndex >= 0) {
      dispatch(updateParticipantInChosenList(value));
    } else {
      dispatch(updateParticipantInPotentialList(value));
    }
  };

  // Обработка сохранения изменений в составе участников собрания
  const handleSaveChange = useCallback(() => {
    if (chosenMeetingParticipants.length === 0) {
      console.warn('No participants selected');
      return;
    }

    dispatch(
      saveMeetingParticipants({
        companyId,
        meetingId,
        participants: chosenMeetingParticipants
      })
    );

    dispatch(
      fetchMeetingParticipants({
        companyId,
        meetingId,
        page: pageCurrent
      })
    );

    navigate(`/company/${companyId}/meetings/${meetingId}/participants`);
  }, [
    chosenMeetingParticipants,
    companyId,
    meetingId,
    pageCurrent,
    dispatch,
    navigate
  ]);

  return (
    <section className={styles.wraper}>
      <div className={styles.actions}>
        <CommonButton color='secondary' onClick={handleSaveChange}>
          Save Meeting Participants
        </CommonButton>
      </div>
      <div className={styles.main_section}>
        <span>Current Meeting Participants</span>
        {isCurrentLoading ? (
          <Preloader />
        ) : (
          <>
            <NewMeetingParticipants
              meetingParticipants={meetingParticipantsValues}
              fileds={['name', 'share']}
              onChangeChosen={handleChangeChosen}
              onChangePresent={handleChangePresent}
            />
            {meetingParticipants && meetingParticipants.totalPages > 1 && (
              <Pagebale
                count={meetingParticipants.totalPages}
                page={pageCurrent}
                onChange={handlePageChangeCurrent}
                classname={styles.pagable}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.main_section}>
        <span>Potential Meeting Participants</span>
        {isPotentialLoading ? (
          <Preloader />
        ) : (
          <>
            <NewMeetingParticipants
              meetingParticipants={potentialMeetingParticipantsValues}
              fileds={['name', 'share']}
              onChangeChosen={handleChangeChosen}
              onChangePresent={handleChangePresent}
            />
            {potentialMeetingParticipants &&
              potentialMeetingParticipants.totalPages > 1 && (
                <Pagebale
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
