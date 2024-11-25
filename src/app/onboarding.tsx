import { Lottie } from '@assets/lottie';
import { Ionicons } from '@expo/vector-icons';
import OnboardingScene from '@src/core/components/OnboardingScene';
import StyledText from '@src/core/components/styled/StyledText';
import { StorageKeys } from '@src/core/constants/storage-keys';
import { wW } from '@src/utils/dimensions';
import { mmkv } from '@src/utils/mmkv';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Onboarding = () => {
  const router = useRouter();
  const svRef = useRef<Animated.ScrollView>(null);

  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);

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

    mmkv.set(StorageKeys.IS_FIRST_APP_OPEN, false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={svRef}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <OnboardingScene
          asset={Lottie.onboarding1}
          title='Your All-in-One Travel Planner'
          description='Effortlessly organize your trips. Add destinations, set dates, and jot down notes.'
        />
        <OnboardingScene
          asset={Lottie.onboarding2}
          title='Your Trips, Your Way'
          description='Categorize your destinations (Upcoming, Completed, etc.) for better organization. View,
          edit, or delete trips as needed.'
        />
        <OnboardingScene
          asset={Lottie.onboarding3}
          title='Plan Smarter, Travel Better'
          description='Stay informed with real-time weather updates. Use our built-in date picker to schedule
          your adventures.'
        />
      </Animated.ScrollView>
      <Pressable
        onPress={onNextPress}
        style={[styles.btnContainer, readyToNavigate && { backgroundColor: colors.primary }]}>
        <StyledText style={styles.btnText}>{readyToNavigate ? 'Enter' : 'Next'}</StyledText>
        <Ionicons
          size={20}
          style={styles.btnIcon}
          name={readyToNavigate ? 'rocket-outline' : 'arrow-forward'}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: margins.xxxl,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: margins.md,
    paddingVertical: margins.xl,
    backgroundColor: colors.accent,
  },
  btnIcon: {
    color: colors.light,
  },
  btnText: {
    textAlign: 'center',
    color: colors.light,
    fontSize: font.sizes.lg,
    fontFamily: font.family.semiBold,
  },
}));

export default Onboarding;
