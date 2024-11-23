import React, { FC, PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type StyledTextProps = TextProps & PropsWithChildren;
const StyledText: FC<StyledTextProps> = ({ children, style, ...props }) => {
  const { styles: uStyles } = useStyles(stylesheet);

  return (
    <Text
      {...props}
      style={[uStyles.default, style]}>
      {children}
    </Text>
  );
};

export default StyledText;

const stylesheet = createStyleSheet(({ colors, font }) => ({
  default: {
    fontFamily: font.family.regular,
    color: colors.typography,
  },
}));
