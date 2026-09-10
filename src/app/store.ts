import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  type TypedUseSelectorHook
} from 'react-redux';
import companiesSlice from '../features/company/getAll/companies-slice';
import currentCompanySlice from '../features/company/getCompany/currentCompany-slice';
import participantsSlice from '../features/participant/getAll/participants-slice';
import currentParticipantSlice from '../features/participant/getParticipant/currrentParticipant-slice';

const rootReducer = combineSlices(
  companiesSlice,
  currentCompanySlice,
  participantsSlice,
  currentParticipantSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
