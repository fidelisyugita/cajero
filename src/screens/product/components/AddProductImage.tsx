import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {IcPicture} from '../../../assets/svgs';
import Image from '../../../components/Image';
import {RootStateProps} from '../../../store';
import {colors} from '../../../styles';
import {s, vs} from '../../../utils/scale';

function AddProductImage({children}: {children?: ReactNode}): JSX.Element {
  const image = useSelector(
    (state: RootStateProps) => state.productCreate.image,
  );

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
      <IcPicture height={s(80)} width={s(80)} />
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

export default AddProductImage;
