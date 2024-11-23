import { UnistylesRegistry } from 'react-native-unistyles';
import { theme } from './theme';

// if you defined themes
type AppTheme = {
  light: typeof theme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppTheme {}
}

UnistylesRegistry.addThemes({
  light: theme,
}).addConfig({
  adaptiveThemes: true,
});
