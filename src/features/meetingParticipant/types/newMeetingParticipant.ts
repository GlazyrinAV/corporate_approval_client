import type { TMeetingParticipant } from './currentMeetingParticipant';

export type TCurrentMeetingParticipant = Omit<TMeetingParticipant, 'id'>;

export type TNewMeetingParticipant = {
  participantId: number;
  isPresent: boolean;
};
