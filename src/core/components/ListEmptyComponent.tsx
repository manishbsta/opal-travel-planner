import { Images } from '@assets/images';
import { wW } from '@src/utils/dimensions';
import { Image } from 'expo-image';
import React, { FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledButton from './styled/StyledButton';
import StyledText from './styled/StyledText';

type ListEmptyComponentProps = {
  title?: string;
  caption?: string;
  btnLabel?: string;
  onPress?: () => void;
};
const ListEmptyComponent: FC<ListEmptyComponentProps> = ({ title, caption, btnLabel, onPress }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Image
        source={Images.empty}
        style={styles.image}
        contentFit='contain'
      />
      <StyledText style={styles.title}>{title ?? 'Its All Empty Here!'}</StyledText>
      {caption && <StyledText style={styles.caption}>{caption}</StyledText>}
      {btnLabel && (
        <StyledButton
          label={btnLabel}
          onPress={onPress}
        />
      )}
    </View>
  );
};

export default ListEmptyComponent;

const stylesheet = createStyleSheet(({ margins, font }) => ({
  container: {
    flex: 1,
    gap: margins.lg,
    paddingTop: '25%',
    padding: margins.lg,
    alignItems: 'center',
  },
  image: {
    width: wW * 0.6,
    height: wW * 0.6,
  },
  title: {
    fontSize: font.sizes.xxl,
    fontFamily: font.family.bold,
    textAlign: 'center',
  },
  caption: {
    textAlign: 'center',
    fontSize: font.sizes.md,
    marginBottom: margins.xxl,
  },
}));
