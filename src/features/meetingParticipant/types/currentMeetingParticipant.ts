import type { TPageble } from '../../../shared/utils/commonTypes';
import type { TParticipant } from '../../participant/types/currentParticipant';

export type TMeetingParticipant = {
  id: number;
  meetingId: number;
  participant: TParticipant;
  isPresent?: boolean;
};

export type TMeetingParticipantPagebale = TPageble & {
  content: TMeetingParticipant[];
};
