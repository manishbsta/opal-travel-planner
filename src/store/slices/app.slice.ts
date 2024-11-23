import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Plan } from '@src/types/plan';
import { clearSecureStorage } from '@src/utils/expo-secure-store';
import { AppState } from './types';

const initialState: AppState = {
  plans: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
    clearStorage: () => {
      clearSecureStorage();
    },
  },
});

export const { clearStorage, setPlans } = appSlice.actions;

export const appReducer = appSlice.reducer;
