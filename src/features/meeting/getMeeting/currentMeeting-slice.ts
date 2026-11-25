import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  type PayloadAction
} from '@reduxjs/toolkit';
import type { TMeeting } from '../types/currentMeeting';
import { getMeetingByIdApi } from '../api/getMeetingApi';
import { deleteMeetingApi } from '../api/editMeetingApi';
import { fetchMeetings } from '../getAllMeetings/meetings-slice';

type TCurrentMeetingState = {
  meeting: TMeeting | null;
  isLoading: boolean;
  error: string | null;
};

type TMeetingApi = {
  companyId: number;
  meetingId: number;
};

const initialState: TCurrentMeetingState = {
  meeting: null,
  isLoading: false,
  error: null
};

export const fetchMeetingById = createAsyncThunk<TMeeting, TMeetingApi>(
  'meeting/fetchMeetingById',
  async ({ companyId, meetingId }) => {
    return getMeetingByIdApi(companyId, meetingId);
  }
);

export const removeMeeting = createAsyncThunk<void, TMeetingApi>(
  'meeting/removeMeeting',
  async ({ companyId, meetingId }, { dispatch }) => {
    await deleteMeetingApi(companyId, meetingId);
    const result = await dispatch(fetchMeetings({ companyId, page: 1 }));
    if (fetchMeetings.fulfilled.match(result)) {
      return;
    }
    throw new Error(
      `Failed to refresh meetings after removing meeting with id: ${meetingId}`
    );
  }
);

export const currentMeetingSlice = createSlice({
  name: 'currentMeeting',
  initialState,
  reducers: {
    clearCurrentMeeting(state) {
      state.meeting = null;
      state.error = null;
    }
  },
  selectors: {
    getCurrentMeeting: (state) => state.meeting,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(fetchMeetingById.pending, removeMeeting.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => fetchMeetingById.fulfilled.match(action),
        (state, action: PayloadAction<TMeeting>) => {
          state.meeting = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => removeMeeting.fulfilled.match(action),
        (state) => {
          state.meeting = null;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchMeetingById.rejected, removeMeeting.rejected),
        (state, action) => {
          state.error = action.error.message ?? 'Error in meeting action';
          state.isLoading = false;
        }
      );
  }
});

export const { clearCurrentMeeting } = currentMeetingSlice.actions;
export default currentMeetingSlice;
export const { getCurrentMeeting, getIsLoading, getError } =
  currentMeetingSlice.selectors;
