import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StorageKeys } from '@src/core/constants/storage-keys';
import { Location } from '@src/types/location';
import { Plan } from '@src/types/plan';
import { addItemToStorage, clearSecureStorage } from '@src/utils/expo-secure-store';
import { AppState } from './types';

const initialState: AppState = {
  plans: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // use this once when app restarts to load plans from storage
    setPlans: (state, action: PayloadAction<string>) => {
      state.plans = JSON.parse(action.payload) as Plan[];
      addItemToStorage(StorageKeys.PLANS, action.payload);
    },
    addPlan: (state, action: PayloadAction<string>) => {
      const plan = JSON.parse(action.payload) as Plan;
      const plans = [...state.plans, plan];

      state.plans.push(plan);
      addItemToStorage(StorageKeys.PLANS, JSON.stringify(plans));
    },
    setDestination: (state, action: PayloadAction<Location | undefined>) => {
      state.destination = action.payload;
    },
    clearStorage: () => {
      clearSecureStorage();
    },
  },
});

export const { clearStorage, setPlans, setDestination, addPlan } = appSlice.actions;

export const appReducer = appSlice.reducer;
