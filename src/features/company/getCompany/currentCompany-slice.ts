import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCompanyByIdApi } from '../api/getCompanyApi';
import type { TCompany } from '../types/currentCompany';
import type { TNewCompany } from '../types/newCompany';
import {
  deleteCompanyApi,
  saveCompanyApi,
  updateCompanyApi
} from '../api/editCompanyApi';
import { fetchCompanies } from '../getAll/companies-slice';

type TCurrentCompanyState = {
  company: TCompany | null;
  isLoading: boolean;
  error: string | null;
};

export const fetchCompanyById = createAsyncThunk(
  'currentCompany/fetchCompanyById',
  async (id: number) => getCompanyByIdApi(id)
);

export const saveCompany = createAsyncThunk(
  'currentCompany/saveCompany',
  async (company: TNewCompany, { dispatch }) => {
    const newCompany = await saveCompanyApi(company);
    await dispatch(fetchCompanies(1));
    return newCompany;
  }
);

export const updateCompany = createAsyncThunk(
  'currentCompany/updateCompany',
  async (company: TCompany, { dispatch }) => {
    const updatedCompany = await updateCompanyApi(company);
    await dispatch(fetchCompanies(1));
    return updatedCompany;
  }
);

export const removeCompany = createAsyncThunk(
  'currentCompany/removeCompany',
  async (id: number, { dispatch }) => {
    await deleteCompanyApi(id);
    await dispatch(fetchCompanies(1));
  }
);

const initialState: TCurrentCompanyState = {
  company: null,
  isLoading: false,
  error: null
};

export const currentCompanySlice = createSlice({
  name: 'currentCompany',
  initialState,
  reducers: {},
  selectors: {
    getCurrentCompany: (state) => state.company,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCompany.fulfilled, (state) => {
        state.company = null;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          fetchCompanyById.pending,
          saveCompany.pending,
          updateCompany.pending,
          removeCompany.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCompanyById.rejected,
          saveCompany.rejected,
          updateCompany.rejected,
          removeCompany.rejected
        ),
        (state, action) => {
          state.error = action.error.message;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCompanyById.fulfilled,
          saveCompany.fulfilled,
          updateCompany.fulfilled
        ),
        (state, action) => {
          state.company = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      );
  }
});

export default currentCompanySlice;
export const { getCurrentCompany, getIsLoading, getError } =
  currentCompanySlice.selectors;
