import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useEffect, useState } from 'react';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../../shared/ui/table/Table';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import styles from './MeetingParticipantsInfo.module.css';
import {
  fetchMeetingParticipants,
  getIsCurrentLoading,
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
  const isLoading = useSelector(getIsCurrentLoading);
  const meetingParticipantsPagebale = useSelector(getMeetingParticipants);
  const [page, setPage] = useState(
    meetingParticipantsPagebale ? meetingParticipantsPagebale.number : 1
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
    if (meetingParticipantsPagebale?.content.length > 0) {
      meetingParticipantsPagebale.content.forEach((participant) =>
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
      ) : meetingParticipantsPagebale?.content != null ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={meetingParticipantsPagebale.totalPages > 1 ? limit : 0}
            tableData={tableData()}
          />
          {limit === undefined && meetingParticipantsPagebale.totalPages > 1 ? (
            <Pagebale
              count={meetingParticipantsPagebale.totalPages}
              page={page}
              onChange={handlePageChange}
              classname={styles.pagebale}
            />
          ) : null}
        </div>
      ) : (
        'Данные об участниках встречи не найдены'
      )}
    </div>
  );
};
