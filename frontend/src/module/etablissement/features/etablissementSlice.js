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

export const updateEtablissement = createAsyncThunk('etablissements/updateEtablissement', async (etablissement) => {
  const response = await etablissementsApi.updateEtablissement(etablissement);
  return response.data;
});

export const deleteEtablissement = createAsyncThunk('etablissements/deleteEtablissement', async (id) => {
  await etablissementsApi.deleteEtablissement(id);
  return id;
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
      })
      .addCase(updateEtablissement.fulfilled, (state, action) => {
        const index = state.etablissements.findIndex((etablissement) => etablissement.id === action.payload.id);
        if (index !== -1) {
          state.etablissements[index] = action.payload;
        }
      })
      .addCase(deleteEtablissement.fulfilled, (state, action) => {
        state.etablissements = state.etablissements.filter((etablissement) => etablissement.id !== action.payload);
      });
  },
});

export default etablissementsSlice.reducer;