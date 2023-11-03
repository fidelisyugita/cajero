import React, {ElementType, ReactNode, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableRipple, TouchableRippleProps} from 'react-native-paper';

import {colors} from '../styles';
import {s, vs} from '../utils/scale';

type Variant =
  | 'primary'
  | 'secondary'
  | 'soft'
  | 'neutral'
  | 'neutralNoStroke'
  | 'warning'
  | 'secondaryWarning'
  | 'positif';

type Size = 'large' | 'medium' | 'small';

interface ButtonIconProps extends Omit<TouchableRippleProps, 'children'> {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  left?: ReactNode;
  right?: ReactNode;
  backgroundColor?: string;
  IconComponent: ElementType;
  transparent?: boolean;
}

type ButtonColors = string[]; // [background, border, text]
type ButtonPaddings = number; // [paddingVertical, paddingHorizontal, paddingHorizontal With Icon]

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
    neutralNoStroke: [
      neutral.c100,
      undefined,
      neutral.c600,
      press.c4,
      undefined,
      neutral.c600,
      neutral.c200,
      undefined,
      neutral.c400,
    ],
    positif: [],
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
    secondaryWarning: [],
    soft: [
      primary.c100,
      primary.c400,
      primary.c400,
      primary.c200,
      primary.c500,
      primary.c500,
      primary.c100,
      primary.c300,
      primary.c200,
    ],
    warning: [],
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
    neutral: 1,
    neutralNoStroke: 0,
    positif: 0,
    primary: 0,
    secondary: 1,
    secondaryWarning: 1,
    soft: 1,
    warning: 0,
  };

  return borderWidth[variant];
}

function getButtonPaddings(size: Size): ButtonPaddings {
  const paddings = {
    large: 16,
    medium: 14,
    small: 12,
  };

  return paddings[size];
}

function getIconSize(size: Size) {
  const textStyles = {
    large: 28,
    medium: 24,
    small: 18,
  };

  return textStyles[size];
}

function ButtonIcon({
  IconComponent,
  backgroundColor,
  containerStyle,
  disabled = false,
  size = 'large',
  transparent = false,
  variant = 'primary',
  ...rest
}: ButtonIconProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);
  const buttonColors: ButtonColors = getButtonColors({
    disabled,
    pressed: isPressed,
    variant,
  });

  const buttuonBorderWidth: number = getButtonBorderWidth({variant});

  const buttonPaddings: ButtonPaddings = getButtonPaddings(size);

  const sizes = getIconSize(size);

  return (
    <View style={[styles.outer, containerStyle]}>
      <TouchableRipple
        borderless
        disabled={disabled}
        rippleColor={buttonColors[0]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        {...rest}>
        <View
          style={[
            styles.content,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: transparent
                ? 'transparent'
                : backgroundColor || buttonColors[0],
              borderColor: buttonColors[1],
              borderWidth: buttuonBorderWidth,
              padding: s(buttonPaddings),
            },
          ]}>
          <IconComponent
            color={buttonColors[2]}
            height={s(sizes)}
            width={s(sizes)}
          />
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    borderRadius: vs(4),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  outer: {
    // alignSelf: 'flex-start',
    borderRadius: vs(4),
    overflow: 'hidden',
  },
});

export default ButtonIcon;
