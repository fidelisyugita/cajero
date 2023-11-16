import React, {ReactNode, forwardRef, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from '../styles';
import {fontFamily, fontStyle} from '../styles/fonts';
import {s, vs} from '../utils/scale';
import ConditionalRender from './ConditionalRender';
import Spacer from './Spacer';
import Text from './Text';

type Size = 'large' | 'medium' | 'small';

interface InputFieldProps extends TextInputProps {
  size?: Size;
  label?: string;
  right?: ReactNode;
  left?: ReactNode;
  containerStyle?: ViewStyle;
  errorMessage?: string;
}

function getStyle(size: Size) {
  if (size === 'medium') {
    return {
      container: {
        gap: vs(12),
        paddingHorizontal: vs(24),
      },
      height: s(52),
      inputFontStyle: {
        ...fontStyle.bodyTextLarge,
        color: colors.neutral.c600,
      },
    };
  } else if (size === 'small') {
    return {
      container: {
        gap: vs(8),
        paddingHorizontal: vs(16),
      },
      height: s(44),
      inputFontStyle: {
        ...fontStyle.bodyTextMedium,
        color: colors.neutral.c600,
      },
    };
  }

  return {
    container: {
      gap: vs(16),
      paddingHorizontal: vs(24),
    },
    height: s(60),
    inputFontStyle: {
      ...fontStyle.bodyTextXLarge,
      color: colors.neutral.c600,
    },
  };
}

const InputField2 = forwardRef<TextInput, InputFieldProps>(
  (
    {
      containerStyle,
      errorMessage,
      label,
      left,
      placeholder,
      right,
      size = 'large',
      style,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const animatedValue = useRef(new Animated.Value(0));

    const {container, height, inputFontStyle} = getStyle(size);

    const isError = !!errorMessage;

    const returnAnimatedLabelStyles = {
      fontSize: animatedValue?.current?.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [
          fontStyle.bodyTextXLarge.fontSize,
          fontStyle.labelSmall.fontSize,
        ],
      }),
      lineHeight: animatedValue?.current?.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [
          fontStyle.bodyTextXLarge.lineHeight,
          fontStyle.labelSmall.lineHeight,
        ],
      }),
      opacity: animatedValue?.current?.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: animatedValue?.current?.interpolate({
            extrapolate: 'clamp',
            inputRange: [0, 1],
            outputRange: [s(27), 0],
          }),
        },
      ],
    };

    const onFocus = () => {
      setIsFocused(true);

      Animated.timing(animatedValue?.current, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        toValue: 1,
        useNativeDriver: false,
      }).start();
    };

    const onBlur = () => {
      setIsFocused(false);
      Animated.timing(animatedValue?.current, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        toValue: 0,
        useNativeDriver: false,
      }).start();
    };

    return (
      <>
        <View
          style={[
            styles.container,
            container,
            {
              backgroundColor: isError
                ? colors.error.c100
                : colors.neutral.c100,
              borderColor: isError
                ? colors.error.c300
                : isFocused
                ? colors.neutral.c400
                : colors.neutral.c300,
              height,
            },
            containerStyle,
          ]}>
          {left}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.neutral.c500}
            ref={ref}
            selectionColor={colors.neutral.c600}
            style={[
              styles.input,
              inputFontStyle,
              {
                color: isError ? colors.error.c400 : colors.neutral.c700,
                height,
              },
              style,
            ]}
            onBlur={onBlur}
            onFocus={onFocus}
            {...rest}
          />
          {right}

          <ConditionalRender condition={!!label}>
            <View style={styles.labelWrapper}>
              <Animated.Text
                style={[
                  {
                    color: isError ? colors.error.c500 : colors.neutral.c600,
                    fontFamily: fontFamily.medium,
                  },
                  returnAnimatedLabelStyles,
                ]}>
                {`  ${label}  `}
              </Animated.Text>
            </View>
            <ConditionalRender condition={isFocused}>
              <View
                style={[
                  styles.labelBackground,
                  {
                    backgroundColor: isError
                      ? colors.error.c100
                      : colors.neutral.c100,
                  },
                ]}>
                <Text color="transparent" textStyle="labelSmall">
                  {`  ${label}  `}
                </Text>
              </View>
            </ConditionalRender>
          </ConditionalRender>
        </View>
        <ConditionalRender condition={isError}>
          <Spacer height={8} />
          <Text color={colors.error.c400} textStyle="bodyTextMedium">
            {errorMessage}
          </Text>
        </ConditionalRender>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: s(4),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    zIndex: 10,
  },
  labelBackground: {
    height: s(9),
    left: s(16),
    position: 'absolute',
    top: -1,
    zIndex: 2,
  },
  labelWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    left: s(16),
    position: 'absolute',
    top: -s(9),
    zIndex: 3,
  },
});

export default InputField2;
