import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  filterParticipantsApi,
  getParticipantsApi
} from '../api/getParticipantApi';
import type { TParticipantPagebale } from '../types/currentParticipant';

export type TParticipantApi = {
  companyId: number;
  page: number;
};

type TParticpantFilter = TParticipantApi & {
  query: string;
};

type TParticipantsState = {
  participants: TParticipantPagebale | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchParticipants = createAsyncThunk(
  'participants/fetchParticipants',
  async ({ companyId, page }: TParticipantApi) => {
    return await getParticipantsApi(companyId, page);
  }
);

export const filterParticipants = createAsyncThunk(
  'participants/filterParticipants',
  async ({ companyId, query, page }: TParticpantFilter) => {
    return await filterParticipantsApi(companyId, query, page);
  }
);

const participantsInintialState: TParticipantsState = {
  participants: null,
  isLoading: false,
  error: null
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState: participantsInintialState,
  reducers: {},
  selectors: {
    getParticipants(state) {
      return state.participants;
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
      .addCase(fetchParticipants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.participants = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(filterParticipants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterParticipants.fulfilled, (state, action) => {
        state.participants = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(filterParticipants.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      });
  }
});

export default participantsSlice;
export const { getParticipants, getIsLoading, getError } =
  participantsSlice.selectors;
