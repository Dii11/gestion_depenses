import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import depenseApi from '../services/depenseApi';

export const fetchDepenses = createAsyncThunk('depenses/fetchDepenses', async () => {
  const response = await depenseApi.getDepenses();
  return response.data;
});

export const addDepense = createAsyncThunk('depenses/addDepense', async (depense) => {
  const response = await depenseApi.addDepense(depense);
  return response.data;
});

export const updateDepense = createAsyncThunk('depenses/updateDepense', async (depense) => {
  const response = await depenseApi.updateDepense(depense);
  return response.data;
});

export const deleteDepense = createAsyncThunk('depenses/deleteDepense', async (id) => {
  await depenseApi.deleteDepense(id);
  return id;
});

const depenseSlice = createSlice({
  name: 'depenses',
  initialState: {
    depenses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepenses.pending, (state) => {
        state.loading = true; // Correction ici: on met loading à true pendant le chargement
        state.error = null;
      })
      .addCase(fetchDepenses.fulfilled, (state, action) => {
        state.loading = false;
        state.depenses = action.payload;
      })
      .addCase(fetchDepenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDepense.fulfilled, (state, action) => {
        state.depenses.push(action.payload);
      })
      .addCase(updateDepense.fulfilled, (state, action) => {
        const index = state.depenses.findIndex((depense) => depense.id === action.payload.id);
        if (index !== -1) {
          state.depenses[index] = action.payload;
        }
      })
      .addCase(deleteDepense.fulfilled, (state, action) => {
        state.depenses = state.depenses.filter((depense) => depense.id !== action.payload);
      });
  },
});

export default depenseSlice.reducer;