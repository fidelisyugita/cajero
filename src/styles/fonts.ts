/* eslint-disable sort-keys-fix/sort-keys-fix */
import {StyleSheet} from 'react-native';

import {s} from '../utils/scale';

const fontFamily = {
  medium: 'DMSans-Medium',
  regular: 'DMSans-Regular',
  semiBold: 'DMSans-SemiBold',
};

const fontStyle = StyleSheet.create({
  heading1: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(48),
    letterSpacing: s(0.48),
    lineHeight: s(62),
  },
  heading2: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(36),
    letterSpacing: s(0.36),
    lineHeight: s(48),
  },
  heading3: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(24),
    lineHeight: s(36),
  },
  heading4: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(20),
    lineHeight: s(28),
  },
  heading5: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(16),
    lineHeight: s(24),
  },
  bodyTextXLarge: {
    fontFamily: fontFamily.regular,
    fontSize: s(20),
    lineHeight: s(28),
  },
  bodyTextLarge: {
    fontFamily: fontFamily.regular,
    fontSize: s(16),
    lineHeight: s(24),
  },
  bodyTextMedium: {
    fontFamily: fontFamily.regular,
    fontSize: s(14),
    lineHeight: s(20),
  },
  bodyTextSmall: {
    fontFamily: fontFamily.regular,
    fontSize: s(12),
    lineHeight: s(18),
  },
  bodyTextXSmall: {
    fontFamily: fontFamily.regular,
    fontSize: s(10),
    lineHeight: s(16),
    letterSpacing: s(1),
  },
  buttonLarge: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(20),
    lineHeight: s(28),
  },
  buttonMedium: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(16),
    lineHeight: s(24),
  },
  buttonSmall: {
    fontFamily: fontFamily.semiBold,
    fontSize: s(12),
    lineHeight: s(18),
  },
  labelXLarge: {
    fontFamily: fontFamily.medium,
    fontSize: s(20),
    lineHeight: s(28),
  },
  labelLarge: {
    fontFamily: fontFamily.medium,
    fontSize: s(16),
    lineHeight: s(24),
  },
  labelMedium: {
    fontFamily: fontFamily.medium,
    fontSize: s(14),
    lineHeight: s(20),
  },
  labelSmall: {
    fontFamily: fontFamily.medium,
    fontSize: s(12),
    lineHeight: s(18),
  },
  labelXSmall: {
    fontFamily: fontFamily.medium,
    fontSize: s(10),
    lineHeight: s(14),
  },
});

export {fontFamily, fontStyle};
