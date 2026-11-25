import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useEffect, useState } from 'react';

import {
  fetchPotentialMeetingParticipantsForCurrentMeeting,
  getPotentionalMeetingParticpants
} from './potentialMeetingParticipants-slice';
import { MeetingParticipantsList } from '../../../widgets/meetingParticipantsList/MeetingParticipantsList';

type PotentialMeetingParticipantsForCurrentMeetingInfoProps = {
  companyId: number;
  meetingId: number;
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const PotentialMeetingParticipantsForCurrentMeetingInfo = ({
  companyId,
  meetingId,
  limit,
  onClick
}: PotentialMeetingParticipantsForCurrentMeetingInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const meetingParticipantsPageable = useSelector(
    getPotentionalMeetingParticpants
  );
  const [page, setPage] = useState(
    meetingParticipantsPageable ? meetingParticipantsPageable.number + 1 : 1
  );

  useEffect(() => {
    dispatch(
      fetchPotentialMeetingParticipantsForCurrentMeeting({
        companyId: companyId,
        meetingId: meetingId,
        page: page
      })
    );
  }, [dispatch, companyId, meetingId, page]);

  return (
    <MeetingParticipantsList
      page={page}
      limit={limit}
      meetingParticipantsPageable={meetingParticipantsPageable}
      onClick={onClick}
      onPageChange={(value) => setPage(value)}
    />
  );
};
