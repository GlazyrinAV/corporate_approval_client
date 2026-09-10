import type { TPageble } from '../../../shared/utils/commonTypes';

export type TParticipant = {
  id?: number;
  name: string;
  dateOfBirth: Date;
  idDocument: string;
  idDocumentData: string;
  registrationAddress: string;
  nominalShare?: string;
  share?: string;
  companyId: string;
  participantType: string;
  isActive: boolean;
};

export type TParticipantPagebale = TPageble & {
  content: TParticipant[];
};
