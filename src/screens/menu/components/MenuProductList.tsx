import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {FlashList} from '@shopify/flash-list';

import {IcEdit, IcPlus} from '../../../assets/svgs';
import ButtonIcon from '../../../components/ButtonIcon';
import ProductCard, {
  ProductCardSkeleton,
} from '../../../components/ProductCard';
import Spacer from '../../../components/Spacer';
import {useGetProductsQuery} from '../../../services/productApi';
import {RootStateProps} from '../../../store';
import {colors} from '../../../styles';
import {generateObjectArray} from '../../../utils/generator';
import {s, vs} from '../../../utils/scale';

const skeletonProducts = generateObjectArray(8);

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
          renderItem={() => <ProductCardSkeleton />}
        />
      ) : (
        <FlashList
          ItemSeparatorComponent={() => <Spacer height={20} />}
          contentContainerStyle={styles.content}
          data={products}
          estimatedItemSize={s(177)}
          keyExtractor={item => item.id}
          numColumns={4}
          renderItem={({item}) => <ProductCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FloatingAction />
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default MenuProductList;
