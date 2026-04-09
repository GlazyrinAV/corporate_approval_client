import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCompanyByIdApi } from '../api/getCompanyApi';
import type { TCompany } from '../types/currentCompany';
import type { TNewCompany } from '../types/newCompany';
import {
  deleteCompanyApi,
  saveCompanyApi,
  updateCompanyApi
} from '../api/editCompanyApi';

export const fetchCompanyById = createAsyncThunk(
  'currentCompany/fetchCompanyById',
  async (id: number) => getCompanyByIdApi(id)
);

type TCurrentCompanyState = {
  company: TCompany | null;
  isLoading: boolean;
  error: string | null;
};

const currentCompanyInitialState: TCurrentCompanyState = {
  company: null,
  isLoading: false,
  error: null
};

export const saveCompany = createAsyncThunk(
  'saveCompany',
  async (company: TNewCompany) => {
    return saveCompanyApi(company);
  }
);

export const updateCompany = createAsyncThunk(
  'updateCompany',
  async (company: TCompany) => {
    return updateCompanyApi(company);
  }
);

export const removeCompany = createAsyncThunk(
  'companies/removeCompany',
  async (id: number) => {
    return deleteCompanyApi(id);
  }
);

export const currentCompanySlice = createSlice({
  name: 'currentCompany',
  initialState: currentCompanyInitialState,
  reducers: {},
  selectors: {
    getCurrentCompany(state) {
      return state.company;
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
      .addCase(fetchCompanyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.company = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(saveCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(saveCompany.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(saveCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeCompany.fulfilled, (state) => {
        state.company = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeCompany.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(removeCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  }
});

export default currentCompanySlice;
export const { getCurrentCompany } = currentCompanySlice.selectors;
