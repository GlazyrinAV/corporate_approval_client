import { useDispatch } from 'react-redux';
import { useSelector, type AppDispatch } from '../../../app/store';
import { fetchMeetings, getIsLoading } from './meetings-slice';
import { useEffect, useState } from 'react';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable, type RowData } from '../../../shared/ui/table/Table';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import styles from './MeetingsInfo.module.css';
import dayjs from 'dayjs';
import type { TPageble } from '../../../shared/utils/commonTypes';
import type { TMeeting } from '../types/currentMeeting';

type MeetingFormatted = Omit<TMeeting, 'dateOfMeeting'> & {
  dateOfMeeting: string;
};

type MeetingInfoData = TPageble & {
  content: MeetingFormatted[];
};

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
  const meetingsPagebale = useSelector((state) => {
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
    meetingsPagebale ? meetingsPagebale.number : 1
  );

  useEffect(() => {
    dispatch(fetchMeetings({ companyId: companyId, page: page }));
  }, [dispatch, companyId, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const tableData = (): RowData[] => {
    const data: RowData[] = [];
    if (meetingsPagebale?.content.length > 0) {
      meetingsPagebale.content.forEach((meeting) =>
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
      ) : meetingsPagebale != null ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={meetingsPagebale.totalPages > 1 ? limit : 0}
            tableData={tableData()}
          />
          {limit === undefined && meetingsPagebale.totalPages > 1 ? (
            <Pagebale
              count={meetingsPagebale.totalPages}
              page={page}
              onChange={handlePageChange}
              classname={styles.pagebale}
            />
          ) : null}
        </div>
      ) : (
        'Данные о встречах не найдены'
      )}
    </div>
  );
};
