import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import type {
  TMeetingParticipant,
  TMeetingParticipantPagebale
} from '../types/currentMeetingParticipant';
import { getAllMeetingParticipantsApi } from '../api/getMeetingParticipant';
import type { TNewMeetingParticipant } from '../types/newMeetingParticipant';
import { saveMeetingParticipantsApi } from '../api/editMeetingParticipantApi';

export type TMeetingParticipantsApi = {
  companyId: number;
  meetingId: number;
  page: number;
};

type TNewMeetingParticipantApi = {
  companyId: number;
  meetingId: number;
  participants: TNewMeetingParticipant[];
};

type TMeetingParticipantsState = {
  meetingParticipants: TMeetingParticipantPagebale | null;
  choosenMeetingParticipants: TNewMeetingParticipant[];
  isLoading: boolean;
  error: string | null;
};

export const fetchMeetingParticipants = createAsyncThunk(
  'meetingParticipants/fetchMeetingParticipants',
  async ({ companyId, meetingId, page }: TMeetingParticipantsApi) => {
    return await getAllMeetingParticipantsApi(companyId, meetingId, page);
  }
);

export const saveMeetingParticipants = createAsyncThunk(
  'meetingParticipant/saveMeetingParticipant',
  async (
    { companyId, meetingId, participants }: TNewMeetingParticipantApi,
    { dispatch }
  ) => {
    const newMeetingParticipants = await saveMeetingParticipantsApi(
      companyId,
      meetingId,
      participants
    );
    dispatch(
      fetchMeetingParticipants({
        companyId: companyId,
        meetingId: meetingId,
        page: 1
      })
    );
    return newMeetingParticipants;
  }
);

const meetingParticipantsInintialState: TMeetingParticipantsState = {
  meetingParticipants: null,
  choosenMeetingParticipants: [],
  isLoading: false,
  error: null
};

export const meetingParticipantsSlice = createSlice({
  name: 'meetingParticipants',
  initialState: meetingParticipantsInintialState,
  reducers: {
    addToChosenList(state, actions: PayloadAction<TMeetingParticipant>) {
      state.choosenMeetingParticipants.push(actions.payload);
    },
    updateParticipantInChosenList(
      state,
      action: PayloadAction<TMeetingParticipant>
    ) {
      return {
        ...state,
        choosenMeetingParticipants: state.choosenMeetingParticipants.map(
          (item) =>
            item.participant.id === action.payload.participant.id
              ? action.payload
              : item
        )
      };
    },
    removeFromChosenList(state, action: PayloadAction<number>) {
      state.choosenMeetingParticipants = [
        ...state.choosenMeetingParticipants.filter(
          (item) => item.participant.id != action.payload
        )
      ];
    }
  },
  selectors: {
    getMeetingParticipants(state) {
      return state.meetingParticipants;
    },
    getChosenMeetingParticipants(state) {
      return state.choosenMeetingParticipants;
    },
    getIsCurrentLoading(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingParticipants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeetingParticipants.fulfilled, (state, action) => {
        state.meetingParticipants = action.payload;
        state.choosenMeetingParticipants = action.payload.content;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(fetchMeetingParticipants.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(saveMeetingParticipants.fulfilled, (state, action) => {
        state.meetingParticipants = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(saveMeetingParticipants.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(saveMeetingParticipants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default meetingParticipantsSlice;
export const {
  getMeetingParticipants,
  getChosenMeetingParticipants,
  getIsCurrentLoading,
  getError
} = meetingParticipantsSlice.selectors;
export const { addToChosenList, removeFromChosenList, updateParticipantInChosenList } =
  meetingParticipantsSlice.actions;
