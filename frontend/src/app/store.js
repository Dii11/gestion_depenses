import { configureStore } from '@reduxjs/toolkit';
import etablissementsReducer from '../module/etablissement/features/etablissementSlice';
import depensesReducer from '../module/depenses/features/depenseSlice';
import auditsReducer from '../module/audit/features/auditSlice'
export const store = configureStore({
  reducer: {
    etablissements: etablissementsReducer,
    depenses:depensesReducer,
    audits:auditsReducer
  },
});