import { useDispatch, useSelector } from 'react-redux';
import { BasicTable } from '../../../shared/ui/table/Table';
import type { AppDispatch } from '../../../app/store';
import {
  fetchParticipants,
  filterParticipants,
  getIsLoading,
  getParticipants
} from './participants-slice';
import { useEffect, useState } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import styles from './ParticipantInfo.module.css';
import { SearchBar } from '../../../widgets/searchBar/SearchBar';

type ParticipantsInfoProps = {
  companyId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const PartcipantsInfo = ({
  companyId,
  limit,
  onClick
}: ParticipantsInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const participantsPagebale = useSelector(getParticipants);
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(
    participantsPagebale ? participantsPagebale.number : 1
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      dispatch(
        filterParticipants({
          query: searchQuery,
          companyId: companyId,
          page: page
        })
      );
    } else {
      dispatch(fetchParticipants({ companyId: companyId, page: page }));
    }
  }, [dispatch, companyId, searchQuery, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.wrapper}>
      {!limit ? (
        <div className={styles.search}>
          <SearchBar
            onSearch={handleSearch}
            onClear={() => {
              setSearchQuery('');
              setPage(1);
            }}
            queryValue={searchQuery}
            placeholder='Найти по имени'
          />
        </div>
      ) : null}
      {isLoading ? (
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
      )}
    </div>
  );
};
