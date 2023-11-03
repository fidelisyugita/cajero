import {MD3LightTheme as DefaultTheme, MD3Theme} from 'react-native-paper';

import {s} from '../utils/scale';
import colors from './colors';
import {fontStyle} from './fonts';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary.c400,
  },
  fonts: {
    ...DefaultTheme.fonts,
    labelLarge: fontStyle.labelLarge,
    labelMedium: fontStyle.labelMedium,
    labelSmall: fontStyle.labelSmall,
  },
  roundness: s(4),
} as MD3Theme;
