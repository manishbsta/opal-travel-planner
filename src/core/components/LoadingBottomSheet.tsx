import { Lottie } from '@assets/lottie';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { wW } from '@src/utils/dimensions';
import LottieView from 'lottie-react-native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './styled/StyledText';

const LOTTIE_SIZE = wW * 0.32;
const BOTTOMSHEET_SIZE = wW * 0.7;
const LoadingBottomSheet = () => {
  const { styles } = useStyles(stylesheet);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        pressBehavior='none'
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      index={0}
      snapPoints={[BOTTOMSHEET_SIZE]}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}>
      <View style={styles.contentContainer}>
        <LottieView
          autoPlay
          source={Lottie.loading}
          style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE }}
        />
        <StyledText style={styles.generatingText}>Generating activities ...</StyledText>
      </View>
    </BottomSheet>
  );
};

export default LoadingBottomSheet;

const stylesheet = createStyleSheet(({ colors, font }) => ({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatingText: {
    fontSize: font.sizes.lg,
    color: colors.primary,
    fontFamily: font.family.bold,
    textAlign: 'center',
  },
}));
