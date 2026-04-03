import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCompanyByIdApi } from '../../services/api';
import type { TCompany } from '../../types/types';

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

export const currentCompanySlice = createSlice({
  name: 'currentCompany',
  initialState: currentCompanyInitialState,
  reducers: {},
  selectors: {
    getCompanyById(state) {
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
      });
  }
});

export default currentCompanySlice.reducer;
export const { getCompanyById } = currentCompanySlice.selectors;
