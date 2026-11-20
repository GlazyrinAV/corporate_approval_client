import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
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

export const fetchPotentialMeetingParticipantsForCurrentMeeting =
  createAsyncThunk(
    'potentialMeetingParticipants/fetchPotentialMeetingParticipantsForCurrentMeeting',
    async ({
      companyId,
      meetingId,
      page
    }: TPotentialMeetingParticipantsForCurrentMeetingApi) => {
      return await getPotentialMeetingParticipantsForCurrentMeetingApi(
        companyId,
        meetingId,
        page
      );
    }
  );

export const fetchPotentialMeetingParticipantsForNewMeeting = createAsyncThunk(
  'potentialMeetingParticipants/fetchPotentialMeetingParticipantsForNewMeeting',
  async ({
    companyId,
    meetingType,
    page
  }: TPotentialMeetingParticipantsForNewMeetingApi) => {
    return await getPotentialMeetingParticipantsForNewMeetingApi(
      companyId,
      meetingType,
      page
    );
  }
);

const meetingParticipantsInintialState: TPotentialMeetingParticipantsState = {
  potentialMeetingParticipants: null,
  isLoading: false,
  error: null
};

export const potentialMeetingParticipantsSlice = createSlice({
  name: 'potentialMeetingParticipants',
  initialState: meetingParticipantsInintialState,
  reducers: {
    updateParticipantInPotentialList(
      state,
      actions: PayloadAction<TMeetingParticipant>
    ) {
      state.potentialMeetingParticipants.content.map((item) =>
        item.participant.id === actions.payload.participant.id
          ? actions.payload
          : item
      );
    },
    clearPotentialList(state) {
      state.potentialMeetingParticipants = null;
    }
  },
  selectors: {
    getPotentionalMeetingParticpants(state) {
      return state.potentialMeetingParticipants;
    },
    getIsPotentialLoading(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPotentialMeetingParticipantsForCurrentMeeting.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchPotentialMeetingParticipantsForCurrentMeeting.fulfilled,
        (state, action) => {
          state.potentialMeetingParticipants = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        fetchPotentialMeetingParticipantsForCurrentMeeting.rejected,
        (state, action) => {
          state.error = action.error.message as string;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchPotentialMeetingParticipantsForNewMeeting.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchPotentialMeetingParticipantsForNewMeeting.fulfilled,
        (state, action) => {
          state.potentialMeetingParticipants = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        fetchPotentialMeetingParticipantsForNewMeeting.rejected,
        (state, action) => {
          state.error = action.error.message as string;
          state.isLoading = false;
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
