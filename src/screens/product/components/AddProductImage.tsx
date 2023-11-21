import React, {ReactNode, memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {IcPicture} from '../../../assets/svgs';
import ConditionalRender from '../../../components/ConditionalRender';
import Image from '../../../components/Image';
import {colors} from '../../../styles';
import {s, vs} from '../../../utils/scale';

function AddProductImage({
  children,
  image,
}: {
  children?: ReactNode;
  image?: {
    type: 'color' | 'image';
    value: string;
  };
}): JSX.Element {
  if (image?.type === 'image') {
    return (
      <Image
        height={s(220)}
        radius={s(4)}
        resizeMode="cover"
        source={{uri: image?.value}}
        style={styles.image}
        width={vs(403)}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: image?.value ? image.value : colors.neutral.c300},
      ]}>
      <ConditionalRender condition={!image?.value}>
        <IcPicture height={s(80)} width={s(80)} />
      </ConditionalRender>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.neutral.c300,
    borderColor: colors.neutral.c400,
    borderRadius: s(4),
    borderWidth: 1,
    gap: s(3),
    height: s(220),
    justifyContent: 'center',
    width: vs(403),
  },
  image: {
    borderColor: colors.neutral.c400,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default memo(AddProductImage);
