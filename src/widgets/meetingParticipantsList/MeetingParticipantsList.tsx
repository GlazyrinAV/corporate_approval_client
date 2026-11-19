import { useSelector } from 'react-redux';
import { Preloader } from '../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../shared/ui/table/Table';
import styles from './MeetingParticipantsList.module.css';
import { getIsPotentialLoading } from '../../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { Pagebale } from '../../shared/ui/pagebale/Pagebale';
import type { TMeetingParticipantPagebale } from '../../features/meetingParticipant/types/currentMeetingParticipant';

type MeetingParticipantsListProps = {
  meetingParticipantsPagebale: TMeetingParticipantPagebale;
  onClick?: (id: number) => void;
  onPageChange?: (id: number) => void;
  limit?: number;
  page: number;
};

export const MeetingParticipantsList = ({
  meetingParticipantsPagebale,
  onClick,
  onPageChange,
  limit = 0,
  page
}: MeetingParticipantsListProps) => {
  const isLoading = useSelector(getIsPotentialLoading);

  const tableData = (): RowData[] => {
    const data: RowData[] = [];
    if (meetingParticipantsPagebale?.content.length > 0) {
      meetingParticipantsPagebale.content.forEach((participant) =>
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
      ) : meetingParticipantsPagebale != null ? (
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
