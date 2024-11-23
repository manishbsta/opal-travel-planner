import { wW } from '@src/utils/dimensions';
import LottieView, { AnimationObject } from 'lottie-react-native';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './styled/StyledText';

type OnboardingSceneProps = ViewProps & {
  asset: AnimationObject;
  title: string;
  description: string;
};

const OnboardingScene: FC<OnboardingSceneProps> = ({
  asset,
  title,
  description,
  style,
  ...props
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View
      style={[{ width: wW }, style]}
      {...props}>
      <LottieView
        autoPlay
        style={{ width: wW, height: wW }}
        source={asset}
      />
      <View style={styles.textContainer}>
        <StyledText style={styles.titleText}>{title}</StyledText>
        <StyledText style={styles.descText}>{description}</StyledText>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ margins, colors, font }) => ({
  textContainer: {
    paddingHorizontal: margins.xxl,
    rowGap: margins.lg,
  },
  titleText: {
    fontFamily: font.family.bold,
    fontSize: font.sizes.lg,
    textAlign: 'center',
    color: colors.primary,
  },
  descText: {
    fontFamily: font.family.regular,
    fontSize: font.sizes.lg,
    textAlign: 'center',
  },
}));

export default OnboardingScene;
