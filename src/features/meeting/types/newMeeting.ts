import type { TMeeting } from './currentMeeting';

export type TNewMeeting = Omit<TMeeting, 'id'>;
