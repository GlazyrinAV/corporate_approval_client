import type { TMeetingParticipant } from './currentMeetingParticipant';

export type TNewMeetingParticipant = Omit<TMeetingParticipant, 'id'>;
