import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {ProductProps} from '../interfaces/CommonInterface';
import {chooseProduct} from '../store/menuChooseStore';
import {setAddProductPopupProps} from '../store/menuStore';
import {colors, globalStyles} from '../styles';
import {formatNumber} from '../utils/convert';
import {s, vs} from '../utils/scale';
import Image from './Image';
import Shimmer from './Shimmer';
import Spacer from './Spacer';
import Text from './Text';

type ProductCardProps = {
  item: ProductProps;
  isLoading?: boolean;
};

function ProductCard({isLoading = false, item}: ProductCardProps): JSX.Element {
  const {name, price, thumbnail} = item || {};
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(chooseProduct({...item, qty: 1}));
  };

  return (
    <TouchableRipple
      borderless
      disabled={isLoading}
      style={styles.productCardTouch}
      onPress={onPress}>
      <View style={styles.productCard}>
        <Image
          withSkeleton
          height={s(96)}
          radius={s(4)}
          resizeMode="cover"
          source={{uri: thumbnail}}
          width={vs(177)}
        />
        <Spacer height={8} />
        <Text
          numberOfLines={1}
          style={globalStyles.shrink}
          textStyle="heading5">
          {name}
        </Text>

        <Spacer height={4} />

        <Text color="primary.c400" textStyle="labelMedium">
          Rp {formatNumber(price || 0)}
        </Text>
      </View>
    </TouchableRipple>
  );
}

export function ProductCardSkeleton(): JSX.Element {
  return (
    <View style={styles.productCard}>
      <Shimmer show height={s(96)} width={vs(177)} />
      <Spacer height={8} />
      <Shimmer show height={s(24)} width="100%" />
      <Spacer height={4} />
      <Shimmer show height={s(20)} width="100%" />
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(8),
    borderWidth: 1,
    padding: s(12),
    width: vs(201),
  },
  productCardTouch: {
    borderRadius: s(4),
  },
});

export default memo(ProductCard);
