import React, {ReactNode} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {NativeStackHeaderProps} from '@react-navigation/native-stack';

import {IcArrowLeft} from '../assets/svgs';
import {colors} from '../styles';
import {s, vs} from '../utils/scale';
import ButtonIcon from './ButtonIcon';
import ConditionalRender from './ConditionalRender';
import Text from './Text';

interface HeaderProps extends NativeStackHeaderProps {
  headerRight?: ReactNode;
}

function Header({headerRight, navigation, options}: HeaderProps): JSX.Element {
  const insets = useSafeAreaInsets();
  const insetsTop =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  return (
    <Surface
      elevation={1}
      style={[
        styles.container,
        {height: s(76) + insetsTop, paddingTop: insetsTop || s(24)},
      ]}
      theme={{
        colors: {
          elevation: {
            level1: colors.supporting.yellow,
          },
        },
      }}>
      <View style={styles.leftWrapper}>
        <ConditionalRender condition={navigation.canGoBack()}>
          <ButtonIcon
            transparent
            IconComponent={IcArrowLeft}
            size="medium"
            variant="neutralNoStroke"
            onPress={() => navigation.pop()}
          />
        </ConditionalRender>
        <Text textStyle="labelXLarge">
          {(typeof options.headerTitle === 'string' && options.headerTitle) ||
            ''}
        </Text>
      </View>
      <ConditionalRender condition={!!headerRight}>
        {headerRight}
      </ConditionalRender>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.supporting.yellow,
    flexDirection: 'row',
    height: s(100),
    justifyContent: 'space-between',
    paddingHorizontal: vs(24),
  },
  leftWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(12),
    left: -s(10),
  },
});

export default Header;
