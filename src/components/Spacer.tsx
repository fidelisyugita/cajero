import React, {memo} from 'react';
import {View} from 'react-native';

import {s, vs} from '../utils/scale';

type SpacerProps = {
  width?: number;
  height?: number;
};

function Spacer({height = 0, width = 0}: SpacerProps): JSX.Element {
  return <View style={{height: s(height), width: vs(width)}} />;
}

export default memo(Spacer);
