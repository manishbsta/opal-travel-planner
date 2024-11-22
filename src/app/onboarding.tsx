import { StorageKeys } from '@src/core/constants/storage-keys';
import { addItemToStorage } from '@src/utils/expo-secure-store';

import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
  const router = useRouter();

  const handleSubmit = () => {
    if (router.canDismiss()) {
      router.dismissAll();
    }

    addItemToStorage(StorageKeys.IS_FIRST_APP_OPEN, false);
    router.push('/');
  };

  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <TouchableOpacity
        className='rounded-lg bg-red-500 p-4 px-10'
        onPress={handleSubmit}>
        <Text className='text-white'>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
