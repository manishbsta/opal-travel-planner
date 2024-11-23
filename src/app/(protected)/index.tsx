import StyledText from '@src/core/components/styled/StyledText';
import { clearSecureStorage } from '@src/utils/expo-secure-store';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Home = () => {
  const router = useRouter();

  const handleSubmit = () => {
    if (router.canDismiss()) {
      router.dismissAll();
    }

    clearSecureStorage();
    router.push('/onboarding');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSubmit}>
        <StyledText>Log out</StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
