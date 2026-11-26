import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useEffect, useState } from 'react';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../../shared/ui/table/Table';
import { Pageable } from '../../../shared/ui/pageable/Pageable';
import styles from './MeetingParticipantsInfo.module.css';
import {
  fetchMeetingParticipants,
  getIsLoading,
  getMeetingParticipants
} from './meetingParticipants-slice';
import {
  fetchMeetingById,
  getCurrentMeeting
} from '../../meeting/getMeeting/currentMeeting-slice';

type MeetingParticipantsInfoProps = {
  companyId: number;
  meetingId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const MeetingParticipantsInfo = ({
  companyId,
  meetingId,
  limit = 0,
  onClick
}: MeetingParticipantsInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getIsLoading);
  const meetingParticipantsPageable = useSelector(getMeetingParticipants);
  const [page, setPage] = useState(
    meetingParticipantsPageable ? meetingParticipantsPageable.number + 1 : 1
  );
  const meeting = useSelector(getCurrentMeeting);

  useEffect(() => {
    if (meetingId) {
      dispatch(fetchMeetingById({ companyId, meetingId }));
    }
    dispatch(
      fetchMeetingParticipants({
        companyId: companyId,
        meetingId: meetingId,
        page: page
      })
    );
  }, [dispatch, companyId, meetingId, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getRole = (participantId: number) => {
    if (meeting && participantId === Number(meeting?.chairmanId)) {
      return 'Председатель';
    } else if (meeting && participantId === Number(meeting?.secretaryId)) {
      return 'Секретарь';
    } else {
      return 'Участник';
    }
  };

  const tableData = (): RowData[] => {
    const data: RowData[] = [];
    if (meetingParticipantsPageable?.content.length > 0) {
      meetingParticipantsPageable.content.forEach((participant) =>
        data.push({
          id: participant.participant.id,
          rowData: [
            {
              cellLabel: 'Роль участника',
              cellValue: getRole(participant.id)
            },
            {
              cellLabel: 'Имя участника',
              cellValue: participant.participant.name
            },
            {
              cellLabel: 'Доля участника',
              cellValue: participant.participant.share
            }
          ]
        })
      );
    }

    return data.sort((a, b) => {
      const dataA = a.rowData.find(
        (a) => a.cellLabel === 'Роль участника'
      ).cellLabel;
      const dataB = b.rowData.find(
        (b) => b.cellLabel === 'Роль участника'
      ).cellLabel;
      return dataA.localeCompare(dataB);
    });
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : meetingParticipantsPageable?.content != null ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={meetingParticipantsPageable.totalPages > 1 ? limit : 0}
            tableData={tableData()}
          />
          {limit === undefined && meetingParticipantsPageable.totalPages > 1 ? (
            <Pageable
              count={meetingParticipantsPageable.totalPages}
              page={page}
              onChange={handlePageChange}
              className={styles.pageable}
            />
          ) : null}
        </div>
      ) : (
        'Данные об участниках встречи не найдены'
      )}
    </div>
  );
};
