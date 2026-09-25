import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useEffect, useState } from 'react';

import { Preloader } from '../../../shared/ui/preloader/Preloader';
import { BasicTable } from '../../../shared/ui/table/Table';
import { Pagebale } from '../../../shared/ui/pagebale/Pagebale';
import styles from './PotentailMeetingParticipants.module.css';

import type { TParticipant } from '../../participant/types/currentParticipant';

import {
  fetchPotentialMeetingParticipants,
  getIsPotentialLoading,
  getPotentionalMeetingParticpants
} from './potentialMeetingParticipants-slice';

type PotentialMeetingParticipantsInfoProps = {
  companyId: number;
  meetingId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const PotentialMeetingParticipantsInfo = ({
  companyId,
  meetingId,
  limit,
  onClick
}: PotentialMeetingParticipantsInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const meetingParticipantsPagebale = useSelector(
    getPotentionalMeetingParticpants
  );
  const isLoading = useSelector(getIsPotentialLoading);
  const [page, setPage] = useState(
    meetingParticipantsPagebale ? meetingParticipantsPagebale.number : 1
  );

  useEffect(() => {
    dispatch(
      fetchPotentialMeetingParticipants({
        companyId: companyId,
        meetingId: meetingId,
        page: page
      })
    );
  }, [dispatch, companyId, meetingId, page]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getParticipantsFromData = (): TParticipant[] => {
    if (meetingParticipantsPagebale?.content.length > 0) {
      const participants: TParticipant[] = [];
      meetingParticipantsPagebale.content.forEach((participant) => {
        participants.push(participant.participant);
      });
      return participants;
    } else {
      return [];
    }
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
            sneakPeek={
              limit && getParticipantsFromData()
                ? limit < getParticipantsFromData().length
                : false
            }
            headers={[
              { colName: 'name', colValue: 'Имя' },
              { colName: 'share', colValue: 'Доля' }
            ]}
            rawData={
              limit
                ? limit >= 0 && getParticipantsFromData().length > 0
                  ? getParticipantsFromData().slice(0, limit)
                  : getParticipantsFromData()
                : getParticipantsFromData()
            }
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
