import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCompaniesApi } from '../api/getCompanyApi';
import type { TCompanyPagebable } from '../types/currentCompany';

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  getCompaniesApi
);

type TCompaniesState = {
  companies: TCompanyPagebable | null;
  isLoading: boolean;
  error: string | null;
};

const companiesInintialState: TCompaniesState = {
  companies: null,
  isLoading: false,
  error: null
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: companiesInintialState,
  reducers: {},
  selectors: {
    getCompanies(state) {
      return state.companies;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      });
  }
});

export default companiesSlice;
export const { getCompanies, getIsLoading, getError } =
  companiesSlice.selectors;
