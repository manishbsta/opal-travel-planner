import { FontFamily } from '@assets/fonts';

export const theme = {
  colors: {
    primary: '#0B2C47',
    secondary: '#3949ab',
    accent: '#81c784',
    background: '#FEFEFA',
    typography: '#242124',
    light: '#FFFFFF',
    dark: '#000000',
    surface: '#F0F8FF',
    divider: '#C0C0C0',
    error: '#C51E3A',
    success: '#228B22',
    disabled: '#BEBFC5',
  },
  margins: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 18,
    xxl: 24,
    xxxl: 32,
  },
  font: {
    sizes: {
      xs: 8,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    family: FontFamily,
  },
} as const;
