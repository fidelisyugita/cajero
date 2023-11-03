import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import {Color} from '../styles/colors';
import {fontFamily, fontStyle} from '../styles/fonts';
import {getColorSystem} from '../utils/convert';
import {s} from '../utils/scale';

interface TextProps extends RNTextProps {
  size?: number;
  color?: Color | string;
  variant?: keyof typeof fontFamily;
  lineHeight?: number;
  textStyle?: keyof typeof fontStyle;
}

function Text({
  children,
  color = 'neutral.c700',
  lineHeight,
  size = 14,
  style,
  textStyle,
  variant = 'regular',
  ...rest
}: TextProps): JSX.Element {
  const styles = {
    color: getColorSystem(color),
    ...(textStyle
      ? fontStyle[textStyle]
      : {
          fontFamily: fontFamily[variant],
          fontSize: s(size),
          lineHeight: lineHeight ? s(lineHeight) : undefined,
        }),
  };

  return (
    <RNText style={[styles, style]} {...rest}>
      {children}
    </RNText>
  );
}

export default Text;
