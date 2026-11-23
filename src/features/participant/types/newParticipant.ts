import type { ParticipantTypeFormValue } from '../../../shared/utils/participantTypes';
import type { TParticipant } from './currentParticipant';

export type TNewParticipant = Omit<TParticipant, 'id' | 'participantType'> & {
  participantType?: ParticipantTypeFormValue;
};
