import { useSelector } from 'react-redux';
import { Preloader } from '../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../shared/ui/table/Table';
import styles from './MeetingParticipantsList.module.css';
import { getIsPotentialLoading } from '../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { Pageable } from '../../shared/ui/pageable/Pageable';
import type { TMeetingParticipantPageable } from '../../features/meetingParticipant/types/currentMeetingParticipant';

type MeetingParticipantsListProps = {
  meetingParticipantsPageable: TMeetingParticipantPageable;
  onClick?: (id: number) => void;
  onPageChange?: (id: number) => void;
  limit?: number;
  page: number;
};

export const MeetingParticipantsList = ({
  meetingParticipantsPageable: meetingParticipantsPageable,
  onClick,
  onPageChange,
  limit = 0,
  page
}: MeetingParticipantsListProps) => {
  const isLoading = useSelector(getIsPotentialLoading);

  const tableData = (): RowData[] => {
    const data: RowData[] = [];
    if (meetingParticipantsPageable?.content.length > 0) {
      meetingParticipantsPageable.content.forEach((participant) =>
        data.push({
          id: participant.participant.id,
          rowData: [
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
    return data;
  };

  const handlePageChange = (value: number) => {
    onPageChange(value);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : meetingParticipantsPageable != null ? (
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
