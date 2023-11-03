import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableRipple, TouchableRippleProps} from 'react-native-paper';

import {colors} from '../styles';
import {fontStyle} from '../styles/fonts';
import {s, vs} from '../utils/scale';
import Text from './Text';

type Size = 'large' | 'medium' | 'small';

type ButtonInputProps = {
  size?: Size;
  onPress?: TouchableRippleProps['onPress'];
  label: string;
  right?: ReactNode;
  containerStyle?: ViewStyle;
};

function getStyle(size: Size) {
  if (size === 'medium') {
    return {
      color: 'neutral.c500',
      container: {
        gap: vs(12),
        paddingHorizontal: vs(24),
      },
      height: s(52),
      textStyle: 'bodyTextLarge',
    };
  } else if (size === 'small') {
    return {
      color: 'neutral.c500',
      container: {
        gap: vs(8),
        paddingHorizontal: vs(16),
      },
      height: s(44),
      textStyle: 'bodyTextMedium',
    };
  }

  return {
    color: 'neutral.c500',
    container: {
      gap: vs(16),
      paddingHorizontal: vs(24),
    },
    height: s(60),
    textStyle: 'bodyTextXLarge',
  };
}

function ButtonInput({
  containerStyle,
  label,
  onPress,
  right,
  size = 'large',
}: ButtonInputProps): JSX.Element {
  const {color, container, height, textStyle} = getStyle(size) as {
    color: string;
    textStyle: keyof typeof fontStyle;
    container: ViewStyle;
    height: number;
  };

  return (
    <TouchableRipple style={styles.container} onPress={onPress}>
      <View style={[styles.content, container, {height}, containerStyle]}>
        <Text color={color} textStyle={textStyle}>
          {label}
        </Text>
        {right}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: s(4),
  },
  content: {
    alignItems: 'center',
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c400,
    borderRadius: s(4),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ButtonInput;
