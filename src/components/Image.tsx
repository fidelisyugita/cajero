import {Skeleton} from 'moti/skeleton';
import React, {useState} from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  StyleSheet,
  View,
} from 'react-native';

import ConditionalRender from './ConditionalRender';

interface ImageProps extends RNImageProps {
  width: number;
  height: number;
  radius?: number;
  withSkeleton?: boolean;
}

function Image({
  height,
  radius = 0,
  style,
  width,
  withSkeleton = false,
  ...rest
}: ImageProps) {
  const [isLoad, setIsLoad] = useState<boolean>(true);

  return (
    <View>
      <ConditionalRender condition={isLoad}>
        <View style={[styles.skeleton, style]}>
          <Skeleton
            colorMode="light"
            height={height}
            radius={radius}
            show={withSkeleton}
            width={width}
          />
        </View>
      </ConditionalRender>
      <RNImage
        style={[{borderRadius: radius, height, width}, style]}
        onLoadEnd={() => setIsLoad(false)}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 3,
  },
});

export default Image;
