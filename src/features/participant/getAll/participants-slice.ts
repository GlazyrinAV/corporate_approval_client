import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  filterParticipantsApi,
  getParticipantsApi
} from '../api/getParticipantApi';
import type { TParticipantPageable } from '../types/currentParticipant';

export type TParticipantApi = {
  companyId: number;
  page: number;
};

type TParticpantFilter = TParticipantApi & {
  query: string;
};

type TParticipantsState = {
  participants: TParticipantPageable | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchParticipants = createAsyncThunk<
  TParticipantPageable,
  TParticipantApi
>('participants/fetchParticipants', async ({ companyId, page }) =>
  getParticipantsApi(companyId, page)
);

export const filterParticipants = createAsyncThunk<
  TParticipantPageable,
  TParticpantFilter
>('participants/filterParticipants', async ({ companyId, query, page }) =>
  filterParticipantsApi(companyId, query, page)
);

const initialParticipantsState: TParticipantsState = {
  participants: null,
  isLoading: false,
  error: null
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState: initialParticipantsState,
  reducers: {},
  selectors: {
    getParticipants: (state) => state.participants,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchParticipants.pending,
          filterParticipants.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchParticipants.rejected,
          filterParticipants.rejected
        ),
        (state, action) => {
          state.error = action.error.message ?? 'Error in participants actions';
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => fetchParticipants.fulfilled.match(action),
        (state, action: ReturnType<typeof fetchParticipants.fulfilled>) => {
          state.participants = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => filterParticipants.fulfilled.match(action),
        (state, action: ReturnType<typeof filterParticipants.fulfilled>) => {
          state.participants = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      );
  }
});

export default participantsSlice;
export const { getParticipants, getIsLoading, getError } =
  participantsSlice.selectors;
