import { configureStore } from '@reduxjs/toolkit';
import etablissementsReducer from '../module/etablissement/features/etablissementSlice';
import depensesReducer from '../module/depenses/features/depenseSlice';

export const store = configureStore({
  reducer: {
    etablissements: etablissementsReducer,
    depenses:depensesReducer,
  },
});