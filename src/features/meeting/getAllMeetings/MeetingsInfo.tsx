import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { fetchMeetings, getIsLoading, getMeetings } from './meetings-slice';
import { useEffect, useState } from 'react';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable } from '../../../shared/ui/table/Table';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import styles from './MeetingsInfo.module.css';

type MeetingsInfoProps = {
  companyId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const MeetingsInfo = ({
  companyId,
  limit,
  onClick
}: MeetingsInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const meetingsPagebale = useSelector(getMeetings);
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

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : meetingsPagebale != null ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={
              limit && meetingsPagebale.content
                ? limit < meetingsPagebale.content.length
                : false
            }
            headers={[
              { colName: 'id', colValue: 'Id' },
              { colName: 'dateOfMeeting', colValue: 'Дата собрания' },
              { colName: 'meetingType', colValue: 'Вид собрания' }
            ]}
            rawData={
              limit
                ? limit >= 0 && meetingsPagebale.content.length > 0
                  ? meetingsPagebale.content.slice(0, limit)
                  : meetingsPagebale.content
                : meetingsPagebale.content
            }
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
