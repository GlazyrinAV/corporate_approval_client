import companiesSlice from '../features/company/getAll/companies-slice';
import currentCompanySlice from '../features/company/getCompany/currentCompany-slice';
import participantsSlice from '../features/participant/getAll/participants-slice';
import currentParticipantSlice from '../features/participant/getParticipant/currentParticipant-slice';
import meetingsSlice from '../features/meeting/getAllMeetings/meetings-slice';
import currentMeetingSlice from '../features/meeting/getMeeting/currentMeeting-slice';
import meetingParticipantsSlice from '../features/meetingParticipant/getAllMeetingParticipants/meetingParticipants-slice';
import currentMeetingParticipantSlice from '../features/meetingParticipant/getMeetingParticipant/currentMeetingParticipant-slice';
import potentialMeetingParticipantsSlice from '../features/meetingParticipant/getPotentialMeetingParticipants/potentialMeetingParticipants-slice';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  type TypedUseSelectorHook
} from 'react-redux';
import editMeetingSlice from '../features/meeting/editMeeting/EditMeeting-slice';

const rootReducer = combineSlices(
  companiesSlice,
  currentCompanySlice,
  participantsSlice,
  currentParticipantSlice,
  meetingsSlice,
  currentMeetingSlice,
  editMeetingSlice,
  meetingParticipantsSlice,
  currentMeetingParticipantSlice,
  potentialMeetingParticipantsSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredPaths: ['editMeeting.form']
      }
    })
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
