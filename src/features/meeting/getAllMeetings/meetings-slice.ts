import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { TMeetingPageable } from '../types/currentMeeting';
import { filterMeetingsApi, getMeetingsApi } from '../api/getMeetingApi';

export type TMeetingApi = {
  companyId: number;
  page: number;
};

type TMeetingFilter = TMeetingApi & {
  query: string;
};

type TMeetingsState = {
  meetings: TMeetingPageable | null;
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

/**
 * Memoized selector that formats meeting dates to strings.
 * Returns empty array when no meetings are loaded.
 */
export const getFormattedMeetings = createSelector(
  [getMeetings],
  (meetings) => {
    if (!meetings?.content) return [];
    return meetings.content.map((meeting) => ({
      ...meeting,
      dateOfMeeting: dayjs(meeting.dateOfMeeting).format('DD-MM-YYYY')
    }));
  }
);
