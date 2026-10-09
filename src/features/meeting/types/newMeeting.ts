import type { TNewMeetingParticipant } from '../../meetingParticipant/types/newMeetingParticipant';
import type { TMeeting } from './currentMeeting';

export type TNewMeeting = Omit<TMeeting, 'id'> & {
  meetingParticipants?: TNewMeetingParticipant[];
};
