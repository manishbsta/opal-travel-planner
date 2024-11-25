import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps, FC } from 'react';
import { ActivityIndicator, Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './StyledText';

type StyledButtonProps = {
  variant?: 'primary' | 'secondary';
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  iconPosition?: 'left' | 'right';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const ICON_SIZE = 18;
const StyledButton: FC<StyledButtonProps> = ({
  variant = 'primary',
  onPress,
  label,
  disabled,
  loading,
  iconName,
  iconPosition = 'left',
  containerStyle,
  labelStyle,
}) => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: colors.secondary },
        variant === 'secondary' && styles.secondaryVariantContainer,
        containerStyle,
        disabled && { backgroundColor: colors.disabled },
        iconPosition === 'right' && { flexDirection: 'row-reverse' },
      ]}>
      {iconName && !loading ? (
        <Ionicons
          size={ICON_SIZE}
          name={iconName}
          color={colors.light}
        />
      ) : null}
      {loading ? (
        <ActivityIndicator
          size={ICON_SIZE}
          color={colors.light}
        />
      ) : null}
      <StyledText style={[styles.label, labelStyle]}>{label}</StyledText>
    </Pressable>
  );
};

export default StyledButton;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: margins.lg,
    backgroundColor: colors.primary,
    paddingVertical: margins.lg,
    paddingHorizontal: margins.xl,
    borderRadius: margins.sm,
    overflow: 'hidden',
  },
  secondaryVariantContainer: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    paddingVertical: margins.lg - 1,
    paddingHorizontal: margins.xl - 1,
  },
  icon: {
    color: colors.light,
  },
  label: {
    color: colors.light,
    textAlign: 'center',
    fontSize: font.sizes.md,
    fontFamily: font.family.semiBold,
  },
}));
