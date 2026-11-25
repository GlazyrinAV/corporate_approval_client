import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  type PayloadAction
} from '@reduxjs/toolkit';
import type {
  TMeetingParticipant,
  TMeetingParticipantPageable
} from '../types/currentMeetingParticipant';
import { getAllMeetingParticipantsApi } from '../api/getMeetingParticipant';
import type { TCurrentMeetingParticipant } from '../types/newMeetingParticipant';
import { saveMeetingParticipantsApi } from '../api/editMeetingParticipantApi';

export type TMeetingParticipantsApi = {
  companyId: number;
  meetingId: number;
  page: number;
};

type TNewMeetingParticipantApi = {
  companyId: number;
  meetingId: number;
  participants: TCurrentMeetingParticipant[];
};

type TMeetingParticipantsState = {
  meetingParticipants: TMeetingParticipantPageable | null;
  choosenMeetingParticipants: TCurrentMeetingParticipant[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TMeetingParticipantsState = {
  meetingParticipants: null,
  choosenMeetingParticipants: [],
  isLoading: false,
  error: null
};

export const fetchMeetingParticipants = createAsyncThunk<
  TMeetingParticipantPageable,
  TMeetingParticipantsApi
>('meetingParticipants/fetchMeetingParticipants', async ({ companyId, meetingId, page }) => {
  return getAllMeetingParticipantsApi(companyId, meetingId, page);
});

export const saveMeetingParticipants = createAsyncThunk<
  void,
  TNewMeetingParticipantApi
>('meetingParticipant/saveMeetingParticipant', async ({ companyId, meetingId, participants }, { dispatch }) => {
  await saveMeetingParticipantsApi(companyId, meetingId, participants);
  await dispatch(fetchMeetingParticipants({ companyId, meetingId, page: 1 }));
});

export const meetingParticipantsSlice = createSlice({
  name: 'meetingParticipants',
  initialState,
  reducers: {
    addToChosenList(state, action: PayloadAction<TCurrentMeetingParticipant>) {
      state.choosenMeetingParticipants.push(action.payload);
    },
    updateParticipantInChosenList(
      state,
      action: PayloadAction<TMeetingParticipant>
    ) {
      const index = state.choosenMeetingParticipants.findIndex(
        (item) => item.participant.id === action.payload.participant.id
      );
      if (index !== -1) {
        state.choosenMeetingParticipants[index] = action.payload as TCurrentMeetingParticipant;
      }
    },
    removeFromChosenList(state, action: PayloadAction<number>) {
      state.choosenMeetingParticipants = state.choosenMeetingParticipants.filter(
        (item) => item.participant.id !== action.payload
      );
    },
    clearChosenList(state) {
      state.choosenMeetingParticipants = [];
    },
    clearMeetingParticipants(state) {
      state.meetingParticipants = null;
      state.error = null;
    }
  },
  selectors: {
    getMeetingParticipants: (state) => state.meetingParticipants,
    getChosenMeetingParticipants: (state) => state.choosenMeetingParticipants,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchMeetingParticipants.pending,
          saveMeetingParticipants.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchMeetingParticipants.rejected,
          saveMeetingParticipants.rejected
        ),
        (state, action) => {
          state.error = action.error.message ?? 'Error in MeetingParticipants actions';
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => fetchMeetingParticipants.fulfilled.match(action),
        (state, action: PayloadAction<TMeetingParticipantPageable>) => {
          state.meetingParticipants = action.payload;
          state.choosenMeetingParticipants = action.payload.content;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => saveMeetingParticipants.fulfilled.match(action),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      );
  }
});

export const { clearMeetingParticipants, clearChosenList, addToChosenList, removeFromChosenList, updateParticipantInChosenList } = meetingParticipantsSlice.actions;
export default meetingParticipantsSlice;
export const { getMeetingParticipants, getChosenMeetingParticipants, getIsLoading, getError } =
  meetingParticipantsSlice.selectors;
