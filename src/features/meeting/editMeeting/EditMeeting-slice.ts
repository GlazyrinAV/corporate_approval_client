import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  type PayloadAction
} from '@reduxjs/toolkit';
import type { TNewMeeting } from '../types/newMeeting';
import type { TMeeting } from '../types/currentMeeting';
import { saveMeetingApi, updateMeetingApi } from '../api/editMeetingApi';
import { fetchMeetings } from '../getAllMeetings/meetings-slice';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TIME_FORMAT = 'HH:mm:ss.SSS';

type editMeetingState = {
  form: TNewMeeting | TMeeting;
  error: string | null;
  isLoading: boolean;
};

type TNewMeetingApi = {
  companyId: number;
  meeting: TNewMeeting;
};

type TUpdateMeetingApi = {
  companyId: number;
  meeting: TMeeting;
};

export type TFieldType<T> = {
  field: keyof T;
  value: string | number | Date;
};

const createDefaultForm = (): TNewMeeting => ({
  companyId: '',
  meetingType: '',
  dateOfMeeting: null,
  dateOfProtocol: null,
  startOfRegistration: null,
  endOfRegistration: null,
  startOfMeeting: null,
  endOfMeeting: null,
  town: '',
  address: '',
  secretaryId: '',
  chairmanId: ''
});

const parseTimeField = (value: string | Date | null): Date | null => {
  if (!value) return null;
  return dayjs(value, TIME_FORMAT).toDate();
};

export const editMeetingInitialState: editMeetingState = {
  form: createDefaultForm(),
  error: null,
  isLoading: false
};

export const saveMeeting = createAsyncThunk(
  'meeting/saveMeeting',
  async ({ companyId, meeting }: TNewMeetingApi, { dispatch }) => {
    const newMeeting = await saveMeetingApi(companyId, meeting);
    await dispatch(fetchMeetings({ companyId, page: 1 }));
    return newMeeting;
  }
);

export const updateMeeting = createAsyncThunk(
  'meeting/updateMeeting',
  async ({ companyId, meeting }: TUpdateMeetingApi, { dispatch }) => {
    const updatedMeeting = await updateMeetingApi(companyId, meeting);
    await dispatch(fetchMeetings({ companyId, page: 1 }));
    return updatedMeeting;
  }
);

export const editMeetingSlice = createSlice({
  name: 'editMeeting',
  initialState: editMeetingInitialState,
  reducers: {
    setFormValue: (state, action: PayloadAction<TFieldType<TNewMeeting>>) => {
      const { field, value } = action.payload;
      if (field in state.form) {
        state.form[field] = value as never;
      }
    },
    loadDefaultValues: (state, action: PayloadAction<TMeeting>) => {
      const { payload } = action;
      state.form = {
        ...payload,
        startOfMeeting: parseTimeField(payload.startOfMeeting),
        endOfMeeting: parseTimeField(payload.endOfMeeting),
        startOfRegistration: parseTimeField(payload.startOfRegistration),
        endOfRegistration: parseTimeField(payload.endOfRegistration)
      };
    }
  },
  selectors: {
    getForm(state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(saveMeeting.pending, updateMeeting.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(saveMeeting.fulfilled, updateMeeting.fulfilled),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(saveMeeting.rejected, updateMeeting.rejected),
        (state, action) => {
          state.error = action.error.message ?? 'Error in new meeting actions';
          state.isLoading = false;
        }
      );
  }
});

export default editMeetingSlice;
export const { getForm } = editMeetingSlice.selectors;
export const { setFormValue, loadDefaultValues } = editMeetingSlice.actions;
