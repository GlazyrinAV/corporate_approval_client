import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import type {
  TMeetingParticipant,
  TMeetingParticipantPagebale
} from '../types/currentMeetingParticipant';
import { getPotentialMeetingParticipantsApi } from '../api/getMeetingParticipant';

export type TPotentialMeetingParticipantsApi = {
  companyId: number;
  meetingId: number;
  page: number;
};

type TPotentialMeetingParticipantsState = {
  potentialMeetingParticipants: TMeetingParticipantPagebale | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchPotentialMeetingParticipants = createAsyncThunk(
  'potentialMeetingParticipants/fetchPotentialMeetingParticipants',
  async ({ companyId, meetingId, page }: TPotentialMeetingParticipantsApi) => {
    return await getPotentialMeetingParticipantsApi(companyId, meetingId, page);
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
      .addCase(fetchPotentialMeetingParticipants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPotentialMeetingParticipants.fulfilled, (state, action) => {
        state.potentialMeetingParticipants = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPotentialMeetingParticipants.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      });
  }
});

export default potentialMeetingParticipantsSlice;
export const {
  getPotentionalMeetingParticpants,
  getIsPotentialLoading,
  getError
} = potentialMeetingParticipantsSlice.selectors;
export const { updateParticipantInPotentialList } =
  potentialMeetingParticipantsSlice.actions;
