import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './StyledText';

type StyledButtonProps = {
  onPress?: () => void;
  label: string;
};

const StyledButton: FC<StyledButtonProps> = ({ onPress, label }) => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { backgroundColor: colors.secondary }]}>
      <StyledText style={styles.label}>{label}</StyledText>
    </Pressable>
  );
};

export default StyledButton;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: margins.lg,
    paddingHorizontal: margins.xl,
    borderRadius: margins.md,
    overflow: 'hidden',
  },
  label: {
    color: colors.light,
    textAlign: 'center',
    fontFamily: font.family.semiBold,
  },
}));
