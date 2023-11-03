import React, {memo, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {FlashList} from '@shopify/flash-list';

import {IcEdit, IcPlus} from '../../../assets/svgs';
import ButtonIcon from '../../../components/ButtonIcon';
import Image from '../../../components/Image';
import Shimmer from '../../../components/Shimmer';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {ProductProps} from '../../../interfaces/CommonInterface';
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from '../../../services/productApi';
import {RootStateProps} from '../../../store';
import {colors, globalStyles} from '../../../styles';
import {formatNumber} from '../../../utils/convert';
import {generateObjectArray} from '../../../utils/generator';
import {s, vs} from '../../../utils/scale';

type ProductCardProps = {
  item: ProductProps;
  isLoading?: boolean;
};

const skeletonProducts = generateObjectArray(8);

function ProductCard({isLoading = false, item}: ProductCardProps): JSX.Element {
  const {name, price, thumbnail} = item || {};
  return (
    <TouchableRipple
      borderless
      disabled={isLoading}
      style={styles.productCardTouch}
      onPress={() => {}}>
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

function SekeletonProductCard(): JSX.Element {
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

function FloatingAction(): JSX.Element {
  return (
    <View style={styles.fabContainer}>
      <ButtonIcon
        IconComponent={IcEdit}
        backgroundColor={colors.neutral.c100}
        size="large"
        variant="secondary"
      />
      <ButtonIcon IconComponent={IcPlus} size="large" />
    </View>
  );
}

function MenuProductList(): JSX.Element {
  const category = useSelector(
    (state: RootStateProps) => state.menu.selectedCategoryId,
  );

  const {data: products, isFetching} = useGetProductsQuery({f: category[0]});

  // useEffect(() => {
  //   if (category) {
  //     getProductsQuery({f: category[0]});
  //   }
  // }, [category]);

  return (
    <>
      {isFetching ? (
        <FlashList
          ItemSeparatorComponent={() => <Spacer height={20} />}
          contentContainerStyle={styles.content}
          data={skeletonProducts}
          estimatedItemSize={s(177)}
          keyExtractor={item => item.id}
          numColumns={4}
          renderItem={() => <SekeletonProductCard />}
        />
      ) : (
        <FlashList
          ItemSeparatorComponent={() => <Spacer height={20} />}
          contentContainerStyle={styles.content}
          data={products}
          estimatedItemSize={s(177)}
          keyExtractor={item => item.id}
          numColumns={4}
          renderItem={({item}) => <MProductCard item={item} />}
        />
      )}

      <FloatingAction />
    </>
  );
}

const styles = StyleSheet.create({
  column: {
    gap: vs(20),
  },
  content: {
    paddingBottom: s(24),
    paddingLeft: vs(22),
  },
  fabContainer: {
    alignItems: 'center',
    bottom: s(24),
    flexDirection: 'row',
    gap: vs(20),
    position: 'absolute',
    right: vs(24),
    zIndex: 3,
  },
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
  separator: {
    height: vs(20),
  },
});

const MProductCard = memo(ProductCard);

export default MenuProductList;
