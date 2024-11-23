import '../../global.css';

import RootProvider from '@src/core/providers/RootProvider';

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
      <Slot />
    </RootProvider>
  );
};

export default AppLayout;
