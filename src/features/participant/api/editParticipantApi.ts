import { checkResponse } from '../../../shared/utils/commonApi';
import { URL } from '../../../shared/utils/commonApi';
import type { TParticipant } from '../types/currentParticipant';
import type { TNewParticipant } from '../types/newParticipant';

export const saveParticipantApi = (
  companyId: number,
  participant: TNewParticipant
) =>
  fetch(`${URL}/${companyId}/participant`, {
    method: 'POST',
    body: JSON.stringify(participant),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TParticipant>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const updateParticipantApi = (
  companyId: number,
  participant: TParticipant
) =>
  fetch(`${URL}/${companyId}/participant/${participant.id}`, {
    method: 'PATCH',
    body: JSON.stringify(participant),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => checkResponse<TParticipant>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const deleteParticipantApi = (companyId: number, participanId: number) =>
  fetch(`${URL}/${companyId}/participant/${participanId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 204) {
      return;
    }
    return Promise.reject();
  });
