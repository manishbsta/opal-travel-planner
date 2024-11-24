import dayjs from 'dayjs';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './styled/StyledText';

const Greetings = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <StyledText style={styles.greetingsText}>Greetings, Travelers!</StyledText>
      <StyledText>{dayjs().format('DD MMMM[,] dddd')}</StyledText>
    </View>
  );
};

export default Greetings;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    gap: margins.sm,
    padding: margins.lg,
    paddingVertical: margins.xl,
    borderRadius: margins.md,
    backgroundColor: colors.surface,
    boxShadow: '0 2 10 rgba(0, 0, 0, 0.1)',
  },
  greetingsText: {
    color: colors.primary,
    fontSize: font.sizes.lg,
    fontFamily: font.family.bold,
  },
}));
