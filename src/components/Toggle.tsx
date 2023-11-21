import React, {memo} from 'react';
import ToggleNative from 'react-native-toggle-element';

import {colors} from '../styles';
import {s, vs} from '../utils/scale';

type ToggleProps = {
  value: boolean;
  onPress: (val?: boolean) => void;
};

function Toggle({onPress, value}: ToggleProps): JSX.Element {
  return (
    <ToggleNative
      value={value}
      thumbButton={{
        activeBackgroundColor: colors.primary.c400,
        height: s(24),
        inActiveBackgroundColor: colors.neutral.c100,
        radius: s(200),
        width: s(24),
      }}
      trackBar={{
        activeBackgroundColor: colors.primary.c100,
        borderWidth: s(4),
        height: s(24),
        inActiveBackgroundColor: colors.neutral.c300,
        radius: s(200),
        width: vs(50),
      }}
      onPress={onPress}
    />
  );
}

export default memo(Toggle);
