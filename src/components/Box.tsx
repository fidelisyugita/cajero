import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../styles';
import {s} from '../utils/scale';
import ConditionalRender from './ConditionalRender';
import Text from './Text';

type BoxProps = {
  children: ReactNode;
};

function Box({children}: BoxProps): JSX.Element {
  return <View style={styles.container}>{children}</View>;
}

type HeaderProps = {
  title: string;
  required?: boolean;
};

function Header({required = false, title}: HeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <Text textStyle="heading4">
        {title}{' '}
        <ConditionalRender condition={required}>
          <Text color="error.c400" textStyle="heading4">
            *
          </Text>
        </ConditionalRender>
      </Text>
    </View>
  );
}

type BodyProps = {
  children: ReactNode;
  style?: ViewStyle;
};

function Body({children, style}: BodyProps): JSX.Element {
  return <View style={[styles.body, style]}>{children}</View>;
}

Box.Header = Header;
Box.Body = Body;

const styles = StyleSheet.create({
  body: {
    padding: s(24),
  },
  container: {
    backgroundColor: colors.neutral.c200,
    borderColor: colors.neutral.c300,
    borderRadius: s(8),
    borderWidth: 1,
  },
  header: {
    backgroundColor: colors.primary.c100,
    paddingHorizontal: s(24),
    paddingVertical: s(12),
  },
});

export default Box;
