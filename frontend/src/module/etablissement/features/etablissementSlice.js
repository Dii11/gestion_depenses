import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import etablissementsApi from '../services/etablissementApi';

export const fetchEtablissements = createAsyncThunk('etablissements/fetchEtablissements', async () => {
  const response = await etablissementsApi.getEtablissements();
  return response.data;
});

export const addEtablissement = createAsyncThunk('etablissements/addEtablissement', async (etablissement) => {
  const response = await etablissementsApi.addEtablissement(etablissement);
  return response.data;
});

const etablissementsSlice = createSlice({
  name: 'etablissements',
  initialState: {
    etablissements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEtablissements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEtablissements.fulfilled, (state, action) => {
        state.loading = false;
        state.etablissements = action.payload;
      })
      .addCase(fetchEtablissements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEtablissement.fulfilled, (state, action) => {
        state.etablissements.push(action.payload);
      });
  },
});

export default etablissementsSlice.reducer;