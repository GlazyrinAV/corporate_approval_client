import {
  createAsyncThunk,
  createSlice,
  createSelector,
  isAnyOf,
  type PayloadAction
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

const initialState: TMeetingsState = {
  meetings: null,
  isLoading: false,
  error: null
};

export const fetchMeetings = createAsyncThunk<TMeetingPageable, TMeetingApi>(
  'meetings/fetchMeetings',
  async ({ companyId, page }) => {
    return getMeetingsApi(companyId, page);
  }
);

export const filterMeetings = createAsyncThunk<
  TMeetingPageable,
  TMeetingFilter
>('meetings/filterMeetings', async ({ companyId, query, page }) => {
  return filterMeetingsApi(companyId, query, page);
});

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    clearMeetings(state) {
      state.meetings = null;
      state.error = null;
    }
  },
  selectors: {
    getMeetings: (state) => state.meetings,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(fetchMeetings.pending, filterMeetings.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchMeetings.fulfilled, filterMeetings.fulfilled),
        (state, action: PayloadAction<TMeetingPageable>) => {
          state.meetings = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchMeetings.rejected, filterMeetings.rejected),
        (state, action) => {
          state.error = action.error.message ?? 'Error in meetings actions';
          state.isLoading = false;
        }
      );
  }
});

export const { clearMeetings } = meetingsSlice.actions;
export default meetingsSlice;
export const { getMeetings, getIsLoading, getError } = meetingsSlice.selectors;

/**
 * Memoized selector that formats meeting dates to strings.
 * Returns empty array when no meetings are loaded.
 */
export const getFormattedMeetings = createSelector(getMeetings, (meetings) => {
  if (!meetings?.content) return [];
  return meetings.content.map((meeting) => ({
    ...meeting,
    dateOfMeeting: dayjs(meeting.dateOfMeeting).format('DD-MM-YYYY')
  }));
});
