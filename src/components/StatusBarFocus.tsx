import React from 'react';
import {
  ColorValue,
  StatusBar as RNStatusBar,
  StatusBarStyle,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import ConditionalRender from './ConditionalRender';

type StatusBarFocusProps = {
  backgroundColor?: ColorValue;
  barStyle?: StatusBarStyle | null;
};

function StatusBarFocus({
  backgroundColor,
  barStyle = 'dark-content',
}: StatusBarFocusProps): JSX.Element {
  const isFocused = useIsFocused();
  return (
    <ConditionalRender condition={isFocused}>
      <RNStatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    </ConditionalRender>
  );
}

export default StatusBarFocus;
