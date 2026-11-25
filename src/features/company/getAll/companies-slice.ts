import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { filterCompaniesApi, getCompaniesApi } from '../api/getCompanyApi';
import type { TCompanyPageable } from '../types/currentCompany';

type TCompanyFilter = {
  query: string;
  page: number;
};

type TCompaniesState = {
  companies: TCompanyPageable | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (page?: number) => getCompaniesApi(page)
);

export const filterCompanies = createAsyncThunk(
  'companies/filterCompanies',
  async ({ query, page }: TCompanyFilter) => filterCompaniesApi(query, page)
);

const initialState: TCompaniesState = {
  companies: null,
  isLoading: false,
  error: null
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  selectors: {
    getCompanies: (state) => state.companies,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(fetchCompanies.pending, filterCompanies.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchCompanies.fulfilled, filterCompanies.fulfilled),
        (state, action) => {
          state.companies = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchCompanies.rejected, filterCompanies.rejected),
        (state, action) => {
          state.error = action.error.message ?? 'Error in companies actions';
          state.isLoading = false;
        }
      );
  }
});

export default companiesSlice;
export const { getCompanies, getIsLoading, getError } =
  companiesSlice.selectors;
