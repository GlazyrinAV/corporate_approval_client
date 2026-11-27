import { useDispatch, useSelector } from 'react-redux';
import { BasicTable, type RowData } from '../../../shared/ui/table/Table';
import type { AppDispatch } from '../../../app/store';
import {
  fetchParticipants,
  filterParticipants,
  getIsLoading,
  getParticipants
} from './participants-slice';
import { useEffect, useState } from 'react';
import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { Pageable } from '../../../shared/ui/pageable/Pageable';
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
  const participantsPageable = useSelector(getParticipants);
  const isLoading = useSelector(getIsLoading);
  const [page, setPage] = useState(
    participantsPageable ? participantsPageable.number + 1 : 1
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
      dispatch(fetchParticipants({ companyId: companyId, page }));
    }
  }, [dispatch, companyId, searchQuery, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleSearch = (query: string) => setSearchQuery(query);

  const tableData = (): RowData[] => {
    const data: RowData[] = [];
    if (participantsPageable?.content.length > 0) {
      participantsPageable.content.forEach((participant) =>
        data.push({
          id: participant.id,
          rowData: [
            {
              cellLabel: 'Имя участника',
              cellValue: participant.name
            },
            {
              cellLabel: 'Доля участника',
              cellValue: participant.share
            }
          ]
        })
      );
    }
    return data;
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
      ) : participantsPageable != null ? (
        <div>
          <BasicTable
            handleClick={onClick}
            disableView={!!limit}
            sneakPeek={participantsPageable.totalPages > 1 ? limit : 0}
            tableData={tableData()}
          />
          {limit === undefined && participantsPageable.totalPages > 1 ? (
            <Pageable
              count={participantsPageable.totalPages}
              page={page}
              onChange={handlePageChange}
              className={styles.pageable}
            />
          ) : null}
        </div>
      ) : (
        'Данные об участниках не найдены'
      )}
    </div>
  );
};
