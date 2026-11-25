import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { TParticipant } from '../types/currentParticipant';
import type { TNewParticipant } from '../types/newParticipant';
import { getParticipantByIdApi } from '../api/getParticipantApi';
import { fetchParticipants } from '../getAll/participants-slice';
import {
  deleteParticipantApi,
  saveParticipantApi,
  updateParticipantApi
} from '../api/editParticipantApi';

type TCurrentParticipantState = {
  participant: TParticipant | null;
  isLoading: boolean;
  error: string | null;
};

type TParticipantApi = {
  companyId: number;
  participantId: number;
};

type TNewParticipantApi = {
  companyId: number;
  participant: TNewParticipant;
};

type TUpdateParticipantApi = {
  companyId: number;
  participant: TParticipant;
};

export const fetchParticipantById = createAsyncThunk<
  TParticipant,
  TParticipantApi
>('participant/fetchParticipantById', async ({ companyId, participantId }) =>
  getParticipantByIdApi(companyId, participantId)
);

export const saveParticipant = createAsyncThunk<
  TParticipant,
  TNewParticipantApi
>('participant/saveParticipant', async ({ companyId, participant }, { dispatch }) => {
  const newParticipant = saveParticipantApi(companyId, participant);
  await dispatch(fetchParticipants({ companyId, page: 1 }));
  return newParticipant;
});

export const updateParticipant = createAsyncThunk<
  TParticipant,
  TUpdateParticipantApi
>('participant/updateParticipant', async ({ companyId, participant }, { dispatch }) => {
  const updatedParticipant = updateParticipantApi(companyId, participant);
  await dispatch(fetchParticipants({ companyId, page: 1 }));
  return updatedParticipant;
});

export const removeParticipant = createAsyncThunk<
  void,
  TParticipantApi
>('participant/removeParticipant', async ({ companyId, participantId }, { dispatch }) => {
  await deleteParticipantApi(companyId, participantId);
  await dispatch(fetchParticipants({ companyId, page: 1 }));
});

const initialCurrentParticipantState: TCurrentParticipantState = {
  participant: null,
  isLoading: false,
  error: null
};

export const currentParticipantSlice = createSlice({
  name: 'currentParticipant',
  initialState: initialCurrentParticipantState,
  reducers: {},
  selectors: {
    getCurrentParticipant: (state) => state.participant,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchParticipantById.pending,
          saveParticipant.pending,
          updateParticipant.pending,
          removeParticipant.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchParticipantById.rejected,
          saveParticipant.rejected,
          updateParticipant.rejected,
          removeParticipant.rejected
        ),
        (state, action) => {
          state.error = action.error.message ?? 'Error in participant actions';
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => fetchParticipantById.fulfilled.match(action),
        (state, action: ReturnType<typeof fetchParticipantById.fulfilled>) => {
          state.participant = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => saveParticipant.fulfilled.match(action),
        (state, action: ReturnType<typeof saveParticipant.fulfilled>) => {
          state.participant = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => updateParticipant.fulfilled.match(action),
        (state, action: ReturnType<typeof updateParticipant.fulfilled>) => {
          state.participant = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => removeParticipant.fulfilled.match(action),
        (state) => {
          state.participant = null;
          state.isLoading = false;
          state.error = null;
        }
      );
  }
});

export default currentParticipantSlice;
export const { getCurrentParticipant } = currentParticipantSlice.selectors;
