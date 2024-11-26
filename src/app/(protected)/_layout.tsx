import { HeaderTitleStyles } from '@src/core/constants/navigation-styles';
import { StorageKeys } from '@src/core/constants/storage-keys';
import { mmkv } from '@src/utils/mmkv';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';

const ProtectedLayout = () => {
  const [isReady, setIsReady] = useState(false);
  const [isFirstAppOpen, setIsFirstAppOpen] = useState(false);

  useEffect(() => {
    const isFirstOpen = mmkv.getBoolean(StorageKeys.IS_FIRST_APP_OPEN);
    if (isFirstOpen === undefined) {
      setIsFirstAppOpen(true);
    } else {
      setIsFirstAppOpen(isFirstOpen);
    }

    setIsReady(true);
  }, []);

  if (!isReady) return null;

  if (isFirstAppOpen) return <Redirect href='/onboarding' />;

  return (
    <Stack screenOptions={{ headerTitleStyle: HeaderTitleStyles }}>
      <Stack.Screen
        name='index'
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name='add-travel-plan'
        options={{ title: 'Add Travel Plan' }}
      />
      <Stack.Screen
        name='select-destination'
        options={{ title: 'Select Destination', headerShown: false }}
      />
      <Stack.Screen
        name='travel-plan-details/[id]'
        options={{ title: 'Travel Details' }}
      />
      <Stack.Screen
        name='travel-plan-map/[id]'
        options={{ title: 'Travel Map' }}
      />
      <Stack.Screen
        name='edit-travel-plan/[id]'
        options={{ title: 'Edit Travel Plan' }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
