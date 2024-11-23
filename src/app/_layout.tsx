import '@src/unistyles';

import { StorageKeys } from '@src/core/constants/storage-keys';
import RootProvider from '@src/core/providers/RootProvider';
import { useAppDispatch } from '@src/store/hooks';
import { setPlans } from '@src/store/slices/app.slice';
import { Plan } from '@src/types/plan';
import { getItemFromStorage } from '@src/utils/expo-secure-store';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
const AppLayout = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <RootProvider>
      <StatusBar style='auto' />
      <AppNavigation />
    </RootProvider>
  );
};

const AppNavigation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydration = async () => {
      const plansResult = await getItemFromStorage(StorageKeys.PLANS);
      if (plansResult) {
        const plans = JSON.parse(plansResult) as Plan[];
        dispatch(setPlans(plans));
      }
    };

    hydration();
  }, [dispatch]);

  return <Slot />;
};

export default AppLayout;
