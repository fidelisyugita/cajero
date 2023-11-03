import React, {ReactNode} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

import {colors} from '../styles';
import {fontFamily} from '../styles/fonts';
import {s} from '../utils/scale';
import ConditionalRender from './ConditionalRender';
import Spacer from './Spacer';
import Text from './Text';

type FormInputProps = {
  label: string;
  RightElement?: ReactNode;
} & TextInputProps;

function FormInput({
  RightElement,
  label,
  style,
  ...rest
}: FormInputProps): JSX.Element {
  return (
    <View>
      <ConditionalRender condition={!!label}>
        <Text lineHeight={18} variant="bold">
          {label}
        </Text>
        <Spacer height={8} />
      </ConditionalRender>

      <View
        style={[styles.inputContainer, !RightElement && {paddingRight: s(12)}]}>
        <TextInput
          placeholderTextColor={colors.gray}
          style={[styles.input, style]}
          {...rest}
        />
        {RightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: colors.bciBlack,
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: s(14),
    paddingVertical: s(14),
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderRadius: s(4),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: s(12),
  },
});

export default FormInput;
