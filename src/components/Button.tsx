import React, {ReactNode, useState} from 'react';
import {StyleSheet, TextProps, View, ViewStyle} from 'react-native';
import {TouchableRipple, TouchableRippleProps} from 'react-native-paper';

import {colors} from '../styles';
import {fontStyle} from '../styles/fonts';
import {s, vs} from '../utils/scale';
import Text from './Text';

type Variant = 'primary' | 'secondary' | 'soft' | 'link' | 'neutral';

type Size = 'large' | 'medium' | 'small';
interface ButtonProps extends TouchableRippleProps {
  variant?: Variant;
  size?: Size;
  children: TextProps['children'];
  disabled?: boolean;
  containerStyle?: ViewStyle;
  left?: ReactNode;
  right?: ReactNode;
  backgroundColor?: string;
}

type ButtonColors = string[]; // [background, border, text]
type ButtonPaddings = number[]; // [paddingVertical, paddingHorizontal, paddingHorizontal With Icon]

function getButtonColors({
  disabled,
  pressed,
  variant,
}: {
  variant: Variant;
  disabled: boolean;
  pressed: boolean;
}): ButtonColors {
  const {neutral, pressed: press, primary} = colors;
  const color = {
    link: [
      undefined,
      undefined,
      primary.c400,
      undefined,
      undefined,
      primary.c500,
      undefined,
      undefined,
      primary.c200,
    ],
    neutral: [
      neutral.c100,
      neutral.c400,
      neutral.c600,
      press.c4,
      neutral.c400,
      neutral.c600,
      neutral.c200,
      neutral.c300,
      neutral.c400,
    ],
    primary: [
      primary.c400,
      undefined,
      neutral.c100,
      press.c3,
      undefined,
      neutral.c100,
      primary.c200,
      undefined,
      neutral.c100,
    ],
    secondary: [
      'transparent',
      primary.c400,
      primary.c400,
      press.c1,
      primary.c500,
      primary.c500,
      neutral.c100,
      primary.c200,
      primary.c200,
    ],
    soft: [
      primary.c100,
      primary.c400,
      primary.c400,
      press.c2,
      primary.c500,
      primary.c500,
      primary.c100,
      primary.c300,
      primary.c200,
    ],
  };

  if (pressed) {
    return color[variant].slice(3, 6) as string[];
  } else if (disabled) {
    return color[variant].slice(6, 9) as string[];
  }

  return color[variant].slice(0, 3) as string[];
}

function getButtonBorderWidth({variant}: {variant: Variant}): number {
  const borderWidth = {
    link: 0,
    neutral: 1,
    primary: 0,
    secondary: 1,
    soft: 1,
  };

  return borderWidth[variant];
}

function getButtonPaddings(size: Size, variant: Variant): ButtonPaddings {
  if (variant === 'link') {
    const paddings = {
      large: [4, 8, 20],
      medium: [4, 8, 20],
      small: [4, 8, 16],
    };
    return paddings[size];
  }

  const paddings = {
    large: [16, 32, 20],
    medium: [14, 28, 20],
    small: [12, 24, 16],
  };

  return paddings[size];
}

function getButtonTextStyles(size: Size) {
  const textStyles = {
    large: 'buttonLarge',
    medium: 'buttonMedium',
    small: 'buttonSmall',
  };

  return textStyles[size] as keyof typeof fontStyle;
}

function Button({
  backgroundColor,
  children,
  containerStyle,
  disabled = false,
  left,
  onPress,
  right,
  size = 'large',
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element {
  const buttonColors: ButtonColors = getButtonColors({
    disabled,
    pressed: false,
    variant,
  });

  const buttuonBorderWidth: number = getButtonBorderWidth({variant});

  const buttonPaddings: ButtonPaddings = getButtonPaddings(size, variant);

  return (
    <View style={[styles.outer, containerStyle]}>
      <TouchableRipple
        borderless
        disabled={!onPress || disabled}
        // rippleColor={buttonColors[0]}
        onPress={onPress}
        // onPressIn={() => setIsPressed(true)}
        // onPressOut={() => setIsPressed(false)}
        {...rest}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: backgroundColor || buttonColors[0],
              borderColor: buttonColors[1],
              borderWidth: buttuonBorderWidth,
              paddingHorizontal:
                left || right ? vs(buttonPaddings[2]) : vs(buttonPaddings[1]),
              paddingVertical: s(buttonPaddings[0]),
            },
          ]}>
          {left}
          <Text color={buttonColors[2]} textStyle={getButtonTextStyles(size)}>
            {children}
          </Text>
          {right}
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    borderRadius: vs(4),
    flexDirection: 'row',
    gap: vs(8),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  outer: {
    borderRadius: vs(4),
    overflow: 'hidden',
  },
});

export default Button;
