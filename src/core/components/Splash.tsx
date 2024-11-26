import { Images } from '@assets/images';
import { wW } from '@src/utils/dimensions';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Splash = () => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Image
        source={Images.logo}
        style={{
          width: wW * 0.4,
          height: wW * 0.4,
        }}
        contentFit='contain'
      />
      <ActivityIndicator
        size='small'
        color={colors.primary}
      />
    </View>
  );
};

export default Splash;

const stylesheet = createStyleSheet(({ colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
}));
