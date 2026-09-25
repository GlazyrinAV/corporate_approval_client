import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TMeetingParticipant } from '../types/currentMeetingParticipant';
import { getMeetingParticipantApi } from '../api/getMeetingParticipant';
import { deleteMeetingParticipantApi } from '../api/editMeetingParticipantApi';
import { fetchMeetingParticipants } from '../getAllMeetingParticipants/meetingParticipants-slice';

type TCurrentMeetingParticipantState = {
  meetingParticipant: TMeetingParticipant | null;
  isLoading: boolean;
  error: string | null;
};

type TMeetingParticipantApi = {
  companyId: number;
  meetingId: number;
  meetingParticipantId: number;
};

export const fetchMeetingParticipantById = createAsyncThunk(
  'meetingParticipant/fetchMeetingParticipantById',
  async ({
    companyId,
    meetingId,
    meetingParticipantId
  }: TMeetingParticipantApi) =>
    getMeetingParticipantApi(companyId, meetingId, meetingParticipantId)
);

export const removeMeetingParticipant = createAsyncThunk(
  'meetingParticipant/removeMeetingParticipant',
  async (
    { companyId, meetingId, meetingParticipantId }: TMeetingParticipantApi,
    { dispatch }
  ) => {
    await deleteMeetingParticipantApi(
      companyId,
      meetingId,
      meetingParticipantId
    );
    await dispatch(
      fetchMeetingParticipants({
        companyId: companyId,
        meetingId: meetingId,
        page: 1
      })
    );
  }
);

const currentMeetingParticipantInitialState: TCurrentMeetingParticipantState = {
  meetingParticipant: null,
  isLoading: false,
  error: null
};

export const currentMeetingParticipantSlice = createSlice({
  name: 'meetingParticipant',
  initialState: currentMeetingParticipantInitialState,
  reducers: {},
  selectors: {
    getCurrentMeetingParticipant(state) {
      return state.meetingParticipant;
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
      .addCase(fetchMeetingParticipantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetingParticipantById.fulfilled, (state, action) => {
        state.meetingParticipant = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMeetingParticipantById.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(removeMeetingParticipant.fulfilled, (state) => {
        state.meetingParticipant = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeMeetingParticipant.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(removeMeetingParticipant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default currentMeetingParticipantSlice;
export const { getCurrentMeetingParticipant } =
  currentMeetingParticipantSlice.selectors;
