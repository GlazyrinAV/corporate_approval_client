import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const fetchMeetingById = createAsyncThunk(
  'meeting/fetchMeetingById',
  async ({ companyId, meetingId }: TMeetingApi) =>
    getMeetingByIdApi(companyId, meetingId)
);

export const removeMeeting = createAsyncThunk(
  'meeting/removeMeeting',
  async ({ companyId, meetingId }: TMeetingApi, { dispatch }) => {
    await deleteMeetingApi(companyId, meetingId);
    await dispatch(fetchMeetings({ companyId: companyId, page: 1 }));
  }
);

const currentMeetingInitialState: TCurrentMeetingState = {
  meeting: null,
  isLoading: false,
  error: null
};

export const currentMeetingSlice = createSlice({
  name: 'currentMeeting',
  initialState: currentMeetingInitialState,
  reducers: {},
  selectors: {
    getCurrentMeeting(state) {
      return state.meeting;
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
      .addCase(fetchMeetingById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetingById.fulfilled, (state, action) => {
        state.meeting = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMeetingById.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(removeMeeting.fulfilled, (state) => {
        state.meeting = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeMeeting.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(removeMeeting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default currentMeetingSlice;
export const { getCurrentMeeting } = currentMeetingSlice.selectors;
