import type { TParticipant } from './currentParticipant';

export type TNewParticipant = Omit<TParticipant, 'id'>;
