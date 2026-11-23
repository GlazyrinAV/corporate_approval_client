import type { TPaginated } from '../../../shared/utils/commonTypes';
import type { ParticipantTypeValue } from '../../../shared/utils/participantTypes';

export type TParticipant = {
  id: number;
  name: string;
  dateOfBirth: Date;
  idDocument: string;
  idDocumentData: string;
  registrationAddress: string;
  nominalShare?: string;
  share?: string;
  companyId: string;
  participantType: ParticipantTypeValue;
  isActive: boolean;
};

export type TParticipantPageable = TPaginated<TParticipant>;
