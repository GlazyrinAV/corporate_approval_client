import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector, type AppDispatch } from '../../../app/store';
import {
  fetchMeetings,
  getFormattedMeetings,
  getIsLoading
} from './meetings-slice';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../../shared/ui/table/Table';
import { Pageable } from '../../../shared/ui/pageable/Pageable';
import styles from './MeetingsInfo.module.css';

type MeetingsInfoProps = {
  companyId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const MeetingsInfo = memo(
  ({ companyId, limit = 0, onClick }: MeetingsInfoProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const formattedMeetings = useSelector(getFormattedMeetings);
    const isLoading = useSelector(getIsLoading);
    const [page, setPage] = useState(1);

    const totalPages = useSelector((state) => {
      const meetings = state.meetings.meetings;
      return meetings?.totalPages ?? 0;
    });

    useEffect(() => {
      dispatch(fetchMeetings({ companyId, page }));
    }, [dispatch, companyId, page]);

    const handlePageChange = useCallback(
      (value: number) => {
        setPage(value);
      },
      []
    );

    const tableData = useCallback((): RowData[] => {
      if (formattedMeetings.length === 0) return [];
      return formattedMeetings.map((meeting) => ({
        id: meeting.id,
        rowData: [
          { cellLabel: 'Дата собрания', cellValue: meeting.dateOfMeeting },
          { cellLabel: 'Вид собрания', cellValue: meeting.meetingType }
        ]
      }));
    }, [formattedMeetings]);

    const shouldShowPageable = useMemo(
      () => limit === undefined && totalPages > 1,
      [limit, totalPages]
    );

    return (
      <div className={styles.wrapper}>
        {isLoading ? (
          <Preloader />
        ) : formattedMeetings.length > 0 ? (
          <div>
            <BasicTable
              handleClick={onClick}
              disableView={!!limit}
              sneakPeek={totalPages > 1 ? limit : 0}
              tableData={tableData()}
            />
            {shouldShowPageable && (
              <Pageable
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                classname={styles.pageable}
              />
            )}
          </div>
        ) : (
          'Данные о встречах не найдены'
        )}
      </div>
    );
  }
);
