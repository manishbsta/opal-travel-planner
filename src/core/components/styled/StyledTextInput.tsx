import React, { FC, useState } from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './StyledText';

type StyledTextInputProps = {
  value?: string;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onIconRightPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
};
const StyledTextInput: FC<StyledTextInputProps> = ({
  value,
  label,
  error,
  required,
  placeholder,
  multiline,
  editable,
  autoFocus,
  secureTextEntry,
  onChangeText,
  onPress,
  iconLeft,
  iconRight,
  onIconRightPress,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
}) => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <View style={styles.labelRow}>
          <StyledText
            style={[styles.label, isInputFocused && { color: colors.primary }, labelStyle]}>
            {label}
          </StyledText>
          {required ? <StyledText style={styles.asterick}> *</StyledText> : null}
        </View>
      ) : null}
      <Pressable
        onPress={onPress}
        style={[
          styles.inputRow,
          error && { borderColor: colors.error },
          isInputFocused && { borderColor: colors.primary },
        ]}>
        {iconLeft ? <View style={styles.iconLeftContainer}>{iconLeft}</View> : null}
        <TextInput
          autoFocus={autoFocus}
          value={value}
          editable={editable}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          numberOfLines={multiline ? 2 : 1}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
        />
        {iconRight ? (
          <TouchableOpacity
            style={styles.iconRightContainer}
            onPress={onIconRightPress}>
            {iconRight}
          </TouchableOpacity>
        ) : null}
      </Pressable>
      {error ? <StyledText style={[styles.error, errorStyle]}>{error}</StyledText> : null}
    </View>
  );
};

export default StyledTextInput;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    width: '100%',
    flexDirection: 'column',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginBottom: margins.sm,
    fontFamily: font.family.semiBold,
  },
  asterick: {
    color: colors.error,
    fontFamily: font.family.bold,
    fontSize: font.sizes.lg,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderColor: colors.disabled,
    borderRadius: margins.sm,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: margins.lg,
    paddingHorizontal: margins.md,
    fontFamily: font.family.semiBold,
  },
  iconLeftContainer: {
    paddingLeft: margins.md,
    justifyContent: 'center',
  },
  iconRightContainer: {
    justifyContent: 'center',
    paddingLeft: margins.lg,
    paddingRight: margins.md,
  },
  error: {
    color: colors.error,
    marginTop: margins.xs,
    marginLeft: margins.sm,
    fontSize: font.sizes.sm,
  },
}));
