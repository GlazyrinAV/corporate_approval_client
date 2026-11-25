import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import type {
  TMeetingParticipant,
  TMeetingParticipantPageable
} from '../types/currentMeetingParticipant';
import {
  getPotentialMeetingParticipantsForCurrentMeetingApi,
  getPotentialMeetingParticipantsForNewMeetingApi
} from '../api/getMeetingParticipant';

export type TPotentialMeetingParticipantsForCurrentMeetingApi = {
  companyId: number;
  meetingId: number;
  page?: number;
};

export type TPotentialMeetingParticipantsForNewMeetingApi = {
  companyId: number;
  meetingType: string;
  page?: number;
};

type TPotentialMeetingParticipantsState = {
  potentialMeetingParticipants: TMeetingParticipantPageable | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchPotentialMeetingParticipantsForCurrentMeeting = createAsyncThunk<
  TMeetingParticipantPageable,
  TPotentialMeetingParticipantsForCurrentMeetingApi
>(
  'potentialMeetingParticipants/fetchPotentialMeetingParticipantsForCurrentMeeting',
  async ({ companyId, meetingId, page }) =>
    getPotentialMeetingParticipantsForCurrentMeetingApi(
      companyId,
      meetingId,
      page
    )
);

export const fetchPotentialMeetingParticipantsForNewMeeting = createAsyncThunk<
  TMeetingParticipantPageable,
  TPotentialMeetingParticipantsForNewMeetingApi
>(
  'potentialMeetingParticipants/fetchPotentialMeetingParticipantsForNewMeeting',
  async ({ companyId, meetingType, page }) =>
    getPotentialMeetingParticipantsForNewMeetingApi(companyId, meetingType, page)
);

const initialPotentialMeetingParticipantsState: TPotentialMeetingParticipantsState = {
  potentialMeetingParticipants: null,
  isLoading: false,
  error: null
};

export const potentialMeetingParticipantsSlice = createSlice({
  name: 'potentialMeetingParticipants',
  initialState: initialPotentialMeetingParticipantsState,
  reducers: {
    updateParticipantInPotentialList(state, action: { payload: TMeetingParticipant }) {
      const content = state.potentialMeetingParticipants?.content;
      if (content) {
        const index = content.findIndex(
          (item) => item.participant.id === action.payload.participant.id
        );
        if (index !== -1) {
          content[index] = action.payload;
        }
      }
    },
    clearPotentialList(state) {
      state.potentialMeetingParticipants = null;
    }
  },
  selectors: {
    getPotentionalMeetingParticpants: (state) => state.potentialMeetingParticipants,
    getIsPotentialLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchPotentialMeetingParticipantsForCurrentMeeting.pending,
          fetchPotentialMeetingParticipantsForNewMeeting.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchPotentialMeetingParticipantsForCurrentMeeting.rejected,
          fetchPotentialMeetingParticipantsForNewMeeting.rejected
        ),
        (state, action) => {
          state.error = action.error.message ?? 'Error in potential participants actions';
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) =>
          fetchPotentialMeetingParticipantsForCurrentMeeting.fulfilled.match(action),
        (state, action: ReturnType<typeof fetchPotentialMeetingParticipantsForCurrentMeeting.fulfilled>) => {
          state.potentialMeetingParticipants = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          fetchPotentialMeetingParticipantsForNewMeeting.fulfilled.match(action),
        (state, action: ReturnType<typeof fetchPotentialMeetingParticipantsForNewMeeting.fulfilled>) => {
          state.potentialMeetingParticipants = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      );
  }
});

export default potentialMeetingParticipantsSlice;
export const {
  getPotentionalMeetingParticpants,
  getIsPotentialLoading,
  getError
} = potentialMeetingParticipantsSlice.selectors;
export const { updateParticipantInPotentialList, clearPotentialList } =
  potentialMeetingParticipantsSlice.actions;
