import {MotiSkeletonProps} from 'moti/build/skeleton/types';
import {Skeleton} from 'moti/skeleton';
import React, {memo} from 'react';

import {s} from '../utils/scale';

interface ShimmerProps extends Omit<MotiSkeletonProps, 'Gradient'> {}

function Shimmer({...rest}: ShimmerProps): JSX.Element {
  return (
    <Skeleton
      colorMode="light"
      colors={['#989B9E', '#D8DCDF']}
      radius={s(4)}
      {...rest}
    />
  );
}

export default memo(Shimmer);
