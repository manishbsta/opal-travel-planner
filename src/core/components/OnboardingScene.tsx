import { wW } from '@src/utils/dimensions';
import LottieView, { AnimationObject } from 'lottie-react-native';
import React, { FC } from 'react';
import { Text, View, ViewProps } from 'react-native';

type OnboardingSceneProps = ViewProps & {
  asset: AnimationObject;
  title: string;
  description: string;
  textContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const OnboardingScene: FC<OnboardingSceneProps> = ({
  asset,
  title,
  description,
  style,
  className,
  textContainerClassName,
  titleClassName,
  descriptionClassName,
  ...props
}) => {
  return (
    <View
      className={`flex-1 ${className}`}
      style={[{ width: wW }, style]}
      {...props}>
      <LottieView
        autoPlay
        style={{ width: wW, height: wW }}
        source={asset}
      />
      <View className={textContainerClassName}>
        <Text className={titleClassName}>{title}</Text>
        <Text className={descriptionClassName}>{description}</Text>
      </View>
    </View>
  );
};

export default OnboardingScene;
