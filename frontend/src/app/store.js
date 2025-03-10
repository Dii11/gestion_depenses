import { configureStore } from '@reduxjs/toolkit';
import etablissementsReducer from '../module/etablissement/features/etablissementSlice';

export const store = configureStore({
  reducer: {
    etablissements: etablissementsReducer,
  },
});