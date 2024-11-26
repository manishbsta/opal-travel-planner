import '@src/unistyles';

import Splash from '@src/core/components/Splash';
import { StorageKeys } from '@src/core/constants/storage-keys';
import RootProvider from '@src/core/providers/RootProvider';
import { useAppDispatch } from '@src/store/hooks';
import { setPlans } from '@src/store/slices/app.slice';
import { mmkv } from '@src/utils/mmkv';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

const AppLayout = () => {
  return (
    <RootProvider>
      <StatusBar style='auto' />
      <AppNavigation />
    </RootProvider>
  );
};

const AppNavigation = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const hydration = async () => {
      const plans = mmkv.getString(StorageKeys.PLANS);
      if (plans) dispatch(setPlans(plans));
    };

    hydration();
  }, [dispatch]);

  if (!isReady) return <Splash />;

  return <Slot />;
};

export default AppLayout;
