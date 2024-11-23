import { Lottie } from '@assets/lottie';
import { Ionicons } from '@expo/vector-icons';
import OnboardingScene from '@src/core/components/OnboardingScene';
import { StorageKeys } from '@src/core/constants/storage-keys';
import { wW } from '@src/utils/dimensions';
import { addItemToStorage } from '@src/utils/expo-secure-store';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { cssInterop } from 'nativewind';
import React, { useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
});

const Onboarding = () => {
  const router = useRouter();
  const svRef = useRef<Animated.ScrollView>(null);

  const offsetX = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const readyToNavigate = index >= 2;

  const observeOffsetX = (offsetValue: number) => {
    const currentIndex = Math.round(offsetValue / wW);
    setIndex(currentIndex);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      offsetX.value = e.contentOffset.x;
    },
    onMomentumEnd: e => {
      runOnJS(observeOffsetX)(e.contentOffset.x);
    },
  });

  const onNextPress = () => {
    Haptics.selectionAsync();

    if (readyToNavigate) {
      handleNavigation();
      return;
    }

    const nextIndex = index + 1;

    // scroll to the next page
    svRef.current?.scrollTo({
      x: wW * nextIndex,
      animated: true,
    });

    setIndex(nextIndex);
  };

  const handleNavigation = () => {
    if (router.canDismiss()) {
      router.dismissAll();
    }

    addItemToStorage(StorageKeys.IS_FIRST_APP_OPEN, false);
    router.push('/');
  };

  return (
    <SafeAreaView className='flex-1'>
      <Animated.ScrollView
        ref={svRef}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='flex-grow-1 pt-16'>
        <OnboardingScene
          asset={Lottie.onboarding1}
          textContainerClassName='px-12 gap-4'
          titleClassName='font-NunitoBold text-xl text-center text-primary'
          descriptionClassName='font-NunitoRegular text-lg text-center'
          title='Your All-in-One Travel Planner'
          description='Effortlessly organize your trips. Add destinations, set dates, and jot down notes.'
        />
        <OnboardingScene
          asset={Lottie.onboarding2}
          textContainerClassName='px-12 gap-4'
          titleClassName='font-NunitoBold text-xl text-center text-primary'
          descriptionClassName='font-NunitoRegular text-lg text-center'
          title='Your Trips, Your Way'
          description='Categorize your destinations (Upcoming, Completed, etc.) for better organization. View,
          edit, or delete trips as needed.'
        />
        <OnboardingScene
          asset={Lottie.onboarding3}
          textContainerClassName='px-12 gap-4'
          titleClassName='font-NunitoBold text-xl text-center text-primary'
          descriptionClassName='font-NunitoRegular text-lg text-center'
          title='Plan Smarter, Travel Better'
          description='Stay informed with real-time weather updates. Use our built-in date picker to schedule
          your adventures.'
        />
      </Animated.ScrollView>
      <Pressable
        className={`${readyToNavigate ? 'bg-primary' : 'bg-accent'} flex-row items-center justify-center gap-2 px-8 py-5`}
        onPress={onNextPress}>
        <Text className='text-center font-NunitoSemiBold text-xl text-white'>
          {readyToNavigate ? 'Enter' : 'Next'}
        </Text>
        <Ionicons
          size={20}
          name={readyToNavigate ? 'rocket-outline' : 'arrow-forward'}
          className='text-xl text-white'
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Onboarding;
