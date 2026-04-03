import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  type TypedUseSelectorHook
} from 'react-redux';
import { companiesSlice } from './companies/companies-slice';
import { currentCompanySlice } from './currentCompany/currentCompany';

const rootReducer = combineSlices(companiesSlice, currentCompanySlice);

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
