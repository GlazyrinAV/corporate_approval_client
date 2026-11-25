import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
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

export const fetchMeetingParticipantById = createAsyncThunk<
  TMeetingParticipant,
  TMeetingParticipantApi
>(
  'meetingParticipant/fetchMeetingParticipantById',
  async ({ companyId, meetingId, meetingParticipantId }) =>
    getMeetingParticipantApi(companyId, meetingId, meetingParticipantId)
);

export const removeMeetingParticipant = createAsyncThunk<
  void,
  TMeetingParticipantApi
>(
  'meetingParticipant/removeMeetingParticipant',
  async ({ companyId, meetingId, meetingParticipantId }, { dispatch }) => {
    await deleteMeetingParticipantApi(
      companyId,
      meetingId,
      meetingParticipantId
    );
    await dispatch(
      fetchMeetingParticipants({
        companyId,
        meetingId,
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
    getCurrentMeetingParticipant: (state) => state.meetingParticipant,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchMeetingParticipantById.pending,
          removeMeetingParticipant.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchMeetingParticipantById.rejected,
          removeMeetingParticipant.rejected
        ),
        (state, action) => {
          state.error =
            action.error.message ?? 'Error in MeetingParticipant actions';
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => fetchMeetingParticipantById.fulfilled.match(action),
        (
          state,
          action: ReturnType<typeof fetchMeetingParticipantById.fulfilled>
        ) => {
          state.meetingParticipant = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => removeMeetingParticipant.fulfilled.match(action),
        (state) => {
          state.meetingParticipant = null;
          state.isLoading = false;
          state.error = null;
        }
      );
  }
});

export default currentMeetingParticipantSlice;
export const { getCurrentMeetingParticipant } =
  currentMeetingParticipantSlice.selectors;
