import React, {forwardRef, useState} from 'react';
import {TextInput as NativeTextInput, StyleSheet} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';

import {colors} from '../styles';
import {fontStyle} from '../styles/fonts';
import {s, vs} from '../utils/scale';
import ConditionalRender from './ConditionalRender';
import Spacer from './Spacer';
import Text from './Text';

interface InputFieldProps extends TextInputProps {
  errorMessage?: string;
}

const InputField = forwardRef<NativeTextInput, InputFieldProps>(
  (
    {
      contentStyle = fontStyle.bodyTextLarge,
      errorMessage,
      label,
      style,
      ...rest
    },
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const isError = !!errorMessage;

    return (
      <>
        <TextInput
          {...rest}
          activeOutlineColor={isError ? colors.error.c400 : colors.neutral.c500}
          contentStyle={contentStyle}
          cursorColor={colors.neutral.c600}
          outlineColor={isError ? colors.error.c300 : colors.neutral.c300}
          outlineStyle={styles.outline}
          placeholderTextColor={colors.neutral.c500}
          ref={ref}
          selectionColor={colors.neutral.c600}
          label={
            typeof label === 'string' ? (
              <Text
                textStyle={'bodyTextXLarge'}
                color={
                  isError
                    ? 'error.c400'
                    : isFocus
                    ? 'neutral.c600'
                    : 'neutral.c500'
                }>
                {label}
              </Text>
            ) : (
              label
            )
          }
          style={[
            styles.style,
            {
              backgroundColor: isError
                ? colors.error.c100
                : colors.neutral.c100,
              color: isError ? colors.neutral.c500 : colors.neutral.c700,
            },
            style,
          ]}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <ConditionalRender condition={isError}>
          <Spacer height={2} />
          <Text color="error.c400" textStyle="bodyTextMedium">
            {errorMessage}
          </Text>
        </ConditionalRender>
      </>
    );
  },
);

const styles = StyleSheet.create({
  outline: {
    borderRadius: vs(4),
    borderWidth: 1,
  },
  style: {
    height: s(60),
    paddingHorizontal: s(10),
    ...fontStyle.bodyTextXLarge,
  },
});

export default InputField;
