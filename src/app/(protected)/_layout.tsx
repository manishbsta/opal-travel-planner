import { HeaderTitleStyles } from '@src/core/constants/navigation-styles';
import { StorageKeys } from '@src/core/constants/storage-keys';
import { getItemFromStorage } from '@src/utils/expo-secure-store';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';

const ProtectedLayout = () => {
  const [isReady, setIsReady] = useState(true);
  const [isFirstOpen, setIsFirstOpen] = useState(false);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const isFirstAppOpen = await getItemFromStorage(StorageKeys.IS_FIRST_APP_OPEN);
      if (isFirstAppOpen) setIsFirstOpen(true);
      setIsReady(false);
    };

    getDataFromStorage();
  }, []);

  if (isReady) return null;

  if (!isFirstOpen) return <Redirect href='/onboarding' />;

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
    </Stack>
  );
};

export default ProtectedLayout;
