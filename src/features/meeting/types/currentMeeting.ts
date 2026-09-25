import type { TPageble } from '../../../shared/utils/commonTypes';

export type TMeeting = {
  id: number;
  companyId: string;
  meetingType: string;
  dateOfMeeting: Date;
  dateOfProtocol: Date;
  startOfRegistration: Date;
  endOfRegistration: Date;
  startOfMeeting: Date;
  endOfMeeting: Date;
  town: string;
  address: string;
  secretaryId: string;
  chairmanId: string;
};

export type TMeetingPagebable = TPageble & {
  content: TMeeting[];
};
