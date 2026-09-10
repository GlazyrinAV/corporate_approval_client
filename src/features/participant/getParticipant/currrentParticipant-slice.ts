import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TParticipant } from '../types/currentParticipant';
import { getParticipantByIdApi } from '../api/getParticipantApi';
import type { TNewParticipant } from '../types/newParticipant';
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

export const fetchParticipantById = createAsyncThunk(
  'currentParticipant/fetchParticipantById',
  async ({ companyId, participantId }: TParticipantApi) =>
    getParticipantByIdApi(companyId, participantId)
);

export const saveParticipant = createAsyncThunk(
  'participant/saveParticipant',
  async ({ companyId, participant }: TNewParticipantApi, { dispatch }) => {
    const newParticipant = await saveParticipantApi(companyId, participant);
    await dispatch(fetchParticipants({ companyId: companyId, page: 1 }));
    return newParticipant;
  }
);

export const updateParticipant = createAsyncThunk(
  'participant/updateParticipant',
  async ({ companyId, participant }: TUpdateParticipantApi, { dispatch }) => {
    const updatedParticipant = await updateParticipantApi(
      companyId,
      participant
    );
    await dispatch(fetchParticipants({ companyId: companyId, page: 1 }));
    return updatedParticipant;
  }
);

export const removeParticipant = createAsyncThunk(
  'participant/removeParticipant',
  async ({ companyId, participantId }: TParticipantApi, { dispatch }) => {
    await deleteParticipantApi(companyId, participantId);
    await dispatch(fetchParticipants({ companyId: companyId, page: 1 }));
  }
);

const currentParticipantInitialState: TCurrentParticipantState = {
  participant: null,
  isLoading: false,
  error: null
};

export const currentParticipantSlice = createSlice({
  name: 'currentParticipant',
  initialState: currentParticipantInitialState,
  reducers: {},
  selectors: {
    getCurrentParticipant(state) {
      return state.participant;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchParticipantById.fulfilled, (state, action) => {
        state.participant = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchParticipantById.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(saveParticipant.fulfilled, (state, action) => {
        state.participant = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(saveParticipant.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(saveParticipant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateParticipant.fulfilled, (state, action) => {
        state.participant = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateParticipant.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(updateParticipant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeParticipant.fulfilled, (state) => {
        state.participant = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeParticipant.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(removeParticipant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default currentParticipantSlice;
export const { getCurrentParticipant } = currentParticipantSlice.selectors;
