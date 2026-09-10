import { useDispatch, useSelector } from 'react-redux';
import { BasicTable } from '../../../shared/ui/table/Table';
import type { AppDispatch } from '../../../app/store';
import {
  fetchParticipants,
  getIsLoading,
  getParticipants
} from './participants-slice';
import { useEffect, useState } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import styles from './ParticipantInfo.module.css';

type ParticipantInfoProps = {
  companyId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const PartcipantsInfo = ({
  companyId,
  limit,
  onClick,
}: ParticipantInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const participantsPagebale = useSelector(getParticipants);
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(
    participantsPagebale ? participantsPagebale.number : 1
  );

  useEffect(() => {
    dispatch(fetchParticipants({ companyId: companyId, page: page }));
  }, [dispatch, companyId, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return isLoading ? (
    <Preloader />
  ) : participantsPagebale != null ? (
    <div>
      <BasicTable
        handleClick={onClick}
        disableView={!!limit}
        sneakPeek={
          limit && participantsPagebale.content
            ? limit < participantsPagebale.content.length
            : false
        }
        headers={[
          { colName: 'name', colValue: 'Имя' },
          { colName: 'share', colValue: 'Доля' }
        ]}
        rawData={
          limit
            ? limit >= 0 && participantsPagebale.content.length > 0
              ? participantsPagebale.content.slice(0, limit)
              : participantsPagebale.content
            : participantsPagebale.content
        }
      />
      {limit === undefined && participantsPagebale.totalPages > 1 ? (
        <Pagebale
          count={participantsPagebale.totalPages}
          page={page}
          onChange={handlePageChange}
          classname={styles.pagebale}
        />
      ) : null}
    </div>
  ) : (
    'Данные об участниках не найдены'
  );
};
