import { useEffect, useState } from 'react';
import { MeetingParticipantsList } from '../../../widgets/meetingParticipantsList/MeetingParticipantsList';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import {
  fetchPotentialMeetingParticipantsForNewMeeting,
  getPotentionalMeetingParticpants
} from './potentialMeetingParticipants-slice';
import { useLocation } from 'react-router';

type PotentialMeetingParticipantsForNewMeetingInfoProps = {
  limit?: number;
  onClick?: (id: number) => void;
  rowClassName?: string;
};

export const PotentialMeetingParticipantsInfoForNewMeeting = ({
  limit,
  onClick
}: PotentialMeetingParticipantsForNewMeetingInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { companyId, meetingType } = location.state;
  const meetingParticipantsPagebale = useSelector(
    getPotentionalMeetingParticpants
  );
  const [page, setPage] = useState(
    meetingParticipantsPagebale ? meetingParticipantsPagebale.number : 1
  );

  useEffect(() => {
    dispatch(
      fetchPotentialMeetingParticipantsForNewMeeting({
        companyId: companyId,
        meetingType: meetingType,
        page: page
      })
    );
  }, [dispatch, companyId, meetingType, page]);

  return (
    <MeetingParticipantsList
      page={page}
      limit={limit}
      meetingParticipantsPagebale={meetingParticipantsPagebale}
      onClick={onClick}
      onPageChange={(value) => setPage(value)}
    />
  );
};
