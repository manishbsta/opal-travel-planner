import { FontFamily } from '@assets/fonts';
import { StyleProp, TextStyle } from 'react-native';

export const HeaderTitleStyles: StyleProp<
  Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight'> & {
    color?: string;
  }
> = {
  fontSize: 22,
  fontFamily: FontFamily.bold,
};
