import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TMeetingPagebable } from '../types/currentMeeting';
import { filterMeetingsApi, getMeetingsApi } from '../api/getMeetingApi';

export type TMeetingApi = {
  companyId: number;
  page: number;
};

type TMeetingFilter = TMeetingApi & {
  query: string;
};

type TMeetingsState = {
  meetings: TMeetingPagebable | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async ({ companyId, page }: TMeetingApi) => {
    return await getMeetingsApi(companyId, page);
  }
);

export const filterMeetings = createAsyncThunk(
  'meetings/filterMeetings',
  async ({ companyId, query, page }: TMeetingFilter) => {
    return await filterMeetingsApi(companyId, query, page);
  }
);

const meetingsInintialState: TMeetingsState = {
  meetings: null,
  isLoading: false,
  error: null
};

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState: meetingsInintialState,
  reducers: {},
  selectors: {
    getMeetings(state) {
      return state.meetings;
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
      .addCase(fetchMeetings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(filterMeetings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterMeetings.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(filterMeetings.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      });
  }
});

export default meetingsSlice;
export const { getMeetings, getIsLoading, getError } = meetingsSlice.selectors;
