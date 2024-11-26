import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StorageKeys } from '@src/core/constants/storage-keys';
import { Location } from '@src/types/location';
import { Plan } from '@src/types/plan';
import { calculateDistance } from '@src/utils/calculate-distance';
import { mmkv } from '@src/utils/mmkv';
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
      mmkv.set(StorageKeys.PLANS, action.payload);
    },
    addPlan: (state, action: PayloadAction<string>) => {
      const plan = JSON.parse(action.payload) as Plan;
      const plans = [...state.plans, plan];

      state.plans.push(plan);
      mmkv.set(StorageKeys.PLANS, JSON.stringify(plans));
    },
    setDestination: (state, action: PayloadAction<Location | undefined>) => {
      state.destination = action.payload;
    },
    updatePlan: (state, action: PayloadAction<string>) => {
      const payload = JSON.parse(action.payload) as Omit<Plan, 'activities'>;
      const index = state.plans.findIndex(p => p.id === payload.id);

      if (index >= 0) {
        const distance = calculateDistance(
          {
            lat: state.plans[index].destination.latitude,
            lng: state.plans[index].destination.longitude,
          },
          {
            lat: payload.destination.latitude,
            lng: payload.destination.longitude,
          },
        );

        // check if destination has changed by more than 4 km
        // if so reset activities
        if (distance > 4) {
          state.plans[index] = { ...payload, activities: [] };
        } else {
          state.plans[index] = { ...state.plans[index], ...payload };
        }

        mmkv.set(StorageKeys.PLANS, JSON.stringify(state.plans));
      }
    },
    updatePlanStatus: (state, action: PayloadAction<string>) => {
      const { id, status } = JSON.parse(action.payload);
      const index = state.plans.findIndex(p => p.id === id);

      if (index >= 0) {
        state.plans[index].status = status;
        mmkv.set(StorageKeys.PLANS, JSON.stringify(state.plans));
      }
    },
    deletePlan: (state, action: PayloadAction<string>) => {
      const planId = action.payload;
      const index = state.plans.findIndex(p => p.id === planId);

      if (index >= 0) {
        state.plans.splice(index, 1);
        mmkv.set(StorageKeys.PLANS, JSON.stringify(state.plans));
      }
    },
    clearStorage: () => {
      mmkv.clearAll();
    },
  },
});

export const {
  clearStorage,
  setPlans,
  setDestination,
  addPlan,
  deletePlan,
  updatePlan,
  updatePlanStatus,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
