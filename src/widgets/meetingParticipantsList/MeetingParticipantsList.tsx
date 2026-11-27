import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../shared/ui/table/Table';
import styles from './MeetingParticipantsList.module.css';
import { getIsPotentialLoading } from '../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { Pageable } from '../../shared/ui/pageable/Pageable';
import type { TMeetingParticipantPageable } from '../../features/meetingParticipant/types/currentMeetingParticipant';

const CELL_LABELS = {
  PARTICIPANT_NAME: 'Имя участника',
  PARTICIPANT_SHARE: 'Доля участника'
} as const;

type MeetingParticipantsListProps = {
  meetingParticipantsPageable: TMeetingParticipantPageable;
  onClick?: (id: number) => void;
  onPageChange?: (id: number) => void;
  limit?: number;
  page?: number;
};

export const MeetingParticipantsList = ({
  meetingParticipantsPageable,
  onClick,
  onPageChange,
  limit = 0,
  page
}: MeetingParticipantsListProps) => {
  const isLoading = useSelector(getIsPotentialLoading);

  const tableData = useMemo<RowData[]>(() => {
    const content = meetingParticipantsPageable?.content;
    if (!content || content.length === 0) return [];

    return content.map((participant) => ({
      id: participant.participant.id,
      rowData: [
        {
          cellLabel: CELL_LABELS.PARTICIPANT_NAME,
          cellValue: participant.participant.name
        },
        {
          cellLabel: CELL_LABELS.PARTICIPANT_SHARE,
          cellValue: participant.participant.share
        }
      ]
    }));
  }, [meetingParticipantsPageable]);

  const totalPages = meetingParticipantsPageable?.totalPages ?? 0;

  const showPagination = limit === undefined && totalPages > 1;

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : tableData.length > 0 ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={totalPages > 1 ? limit : 0}
            tableData={tableData}
          />
          {showPagination && (
            <Pageable
              count={totalPages}
              page={page ?? 0}
              onChange={onPageChange}
              className={styles.pageable}
            />
          )}
        </div>
      ) : (
        <p>Данные об участниках встречи не найдены</p>
      )}
    </div>
  );
};
