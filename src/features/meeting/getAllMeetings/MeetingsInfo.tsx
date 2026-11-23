import { useDispatch } from 'react-redux';
import { useSelector, type AppDispatch } from '../../../app/store';
import { fetchMeetings, getIsLoading } from './meetings-slice';
import { useEffect, useState } from 'react';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../../shared/ui/table/Table';
import { Pageable } from '../../../shared/ui/pageable/Pageable';
import styles from './MeetingsInfo.module.css';
import dayjs from 'dayjs';
import type { TPaginated } from '../../../shared/utils/commonTypes';
import type { TMeeting } from '../types/currentMeeting';

type MeetingFormatted = Omit<TMeeting, 'dateOfMeeting'> & {
  dateOfMeeting: string;
};

type MeetingInfoData = TPaginated<MeetingFormatted>;

type MeetingsInfoProps = {
  companyId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const MeetingsInfo = ({
  companyId,
  limit = 0,
  onClick
}: MeetingsInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const meetingsPageable = useSelector((state) => {
    const meetings = state.meetings.meetings;
    const data: MeetingInfoData = {
      ...meetings,
      content: []
    };
    if (meetings?.content) {
      data.content = meetings?.content?.map((meeting) => ({
        ...meeting,
        dateOfMeeting: dayjs(meeting.dateOfMeeting).format('DD-MM-YYYY')
      }));
    }
    return data;
  });
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(
    meetingsPageable ? meetingsPageable.number : 1
  );

  useEffect(() => {
    dispatch(fetchMeetings({ companyId: companyId, page: page }));
  }, [dispatch, companyId, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const tableData = (): RowData[] => {
    const data: RowData[] = [];
    if (meetingsPageable?.content.length > 0) {
      meetingsPageable.content.forEach((meeting) =>
        data.push({
          id: meeting.id,
          rowData: [
            { cellLabel: 'Дата собрания', cellValue: meeting.dateOfMeeting },
            { cellLabel: 'Вид собрания', cellValue: meeting.meetingType }
          ]
        })
      );
    }
    return data;
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : meetingsPageable != null ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={meetingsPageable.totalPages > 1 ? limit : 0}
            tableData={tableData()}
          />
          {limit === undefined && meetingsPageable.totalPages > 1 ? (
            <Pageable
              count={meetingsPageable.totalPages}
              page={page}
              onChange={handlePageChange}
              classname={styles.pageable}
            />
          ) : null}
        </div>
      ) : (
        'Данные о встречах не найдены'
      )}
    </div>
  );
};
