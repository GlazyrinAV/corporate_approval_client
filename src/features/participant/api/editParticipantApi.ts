import { buildOptions, checkResponse } from '../../../shared/utils/commonApi';
import type { TParticipant } from '../types/currentParticipant';
import type { TNewParticipant } from '../types/newParticipant';
import {
  buildParticipantByIdUrl,
  buildParticipantUrl
} from './getParticipantApi';

export const saveParticipantApi = (
  companyId: number,
  participant: TNewParticipant
) =>
  fetch(buildParticipantUrl(companyId), buildOptions('POST', participant)).then(
    (res) => checkResponse<TParticipant>(res)
  );

export const updateParticipantApi = (
  companyId: number,
  participant: TParticipant
) =>
  fetch(
    buildParticipantByIdUrl(companyId, participant.id),
    buildOptions('PATCH', participant)
  ).then((res) => checkResponse<TParticipant>(res));

export const deleteParticipantApi = (companyId: number, participanId: number) =>
  fetch(
    buildParticipantByIdUrl(companyId, participanId),
    buildOptions('DELETE')
  ).then((res) => {
    if (res.status === 204) {
      return;
    }
    return Promise.reject();
  });
