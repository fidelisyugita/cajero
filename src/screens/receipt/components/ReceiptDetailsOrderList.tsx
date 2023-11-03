import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import {FlashList} from '@shopify/flash-list';

import {IcTable, IcUser} from '../../../assets/svgs';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {colors, globalStyles} from '../../../styles';
import {currencyPrice} from '../../../utils/convert';
import {s, vs} from '../../../utils/scale';

type OrderItemProps = {
  item: OrderProps;
};

type OrderProps = {
  discount: number;
  id: number;
  price: number;
  productName: string;
  qty: number;
  variant: VariantProps[];
};

type VariantProps = {
  id: number;
  name: string;
  price: number;
  value: string;
};

const orderList = [
  {
    discount: 5,
    id: 1,
    price: 20000,
    productName: 'Lemon Tea',
    qty: 2,
    variant: [
      {
        id: 1,
        name: 'Size',
        price: 2500,
        value: 'Medium',
      },
      {
        id: 2,
        name: 'Sugar',
        price: 2500,
        value: 'Normal Sugar',
      },
      {
        id: 3,
        name: 'Topping',
        price: 2500,
        value: 'Oreo',
      },
    ],
  },
  {
    discount: 5,
    id: 2,
    price: 20000,
    productName: 'Lemon Tea',
    qty: 2,
    variant: [
      {
        id: 1,
        name: 'Size',
        price: 2500,
        value: 'Medium',
      },
      {
        id: 2,
        name: 'Sugar',
        price: 2500,
        value: 'Normal Sugar',
      },
      {
        id: 3,
        name: 'Topping',
        price: 2500,
        value: 'Oreo',
      },
    ],
  },
];

function OrderHeader(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.orderHeaderWrapper}>
        <View style={styles.rowItem}>
          <IcUser color={colors.neutral.c500} height={s(20)} width={s(20)} />
          <Text textStyle="bodyTextLarge">Eleanor Pena</Text>
        </View>
        <View style={styles.rowItem}>
          <IcTable color={colors.neutral.c500} height={s(20)} width={s(20)} />
          <Text textStyle="bodyTextLarge">12</Text>
        </View>

        <Text textStyle="bodyTextLarge">
          {t('Payment Method')} : Bank Transfer
        </Text>
      </View>
      <Spacer height={12} />
      <View style={globalStyles.horizontalLine} />
      <Spacer height={12} />

      <Text textStyle="labelMedium">{t('Order List')}</Text>
      <Spacer height={12} />
    </>
  );
}

function OrderItem({item}: OrderItemProps): JSX.Element {
  const {t} = useTranslation();
  const {discount, price, productName, qty, variant} = item;

  return (
    <View style={styles.orderItem}>
      <Text textStyle="heading5">{qty}</Text>
      <View style={styles.rowOrderWrapper}>
        <View style={styles.rowOrderItem}>
          <Text textStyle="heading5">{productName}</Text>
          <Text textStyle="heading5">{currencyPrice(price)}</Text>
        </View>
        {variant.map(v => (
          <View key={v.id} style={styles.rowOrderItem}>
            <View style={styles.variantWrapper}>
              <Text color="neutral.c500" textStyle="labelXSmall">
                {v.name}
              </Text>
              <View style={styles.dot} />
              <Text color="neutral.c500" textStyle="labelXSmall">
                {v.value}
              </Text>
            </View>
            <Text color="neutral.c500" textStyle="labelXSmall">
              {currencyPrice(v.price)}
            </Text>
          </View>
        ))}
        <View style={styles.rowOrderItem}>
          <Text color="success.c400" textStyle="bodyTextSmall">
            {t('Discount')}
          </Text>
          <Text color="success.c400" textStyle="bodyTextSmall">
            {discount}%
          </Text>
        </View>
      </View>
    </View>
  );
}

function separator() {
  return <View style={globalStyles.horizontalLine} />;
}

function ReceiptDetailsOrderList(): JSX.Element {
  return (
    <View style={styles.container}>
      <FlashList
        ItemSeparatorComponent={separator}
        ListHeaderComponent={OrderHeader}
        contentContainerStyle={styles.content}
        data={orderList}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <OrderItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(8),
    borderWidth: 1,
    flex: 1,
    minHeight: s(500),
  },
  content: {
    minHeight: s(500),
    padding: s(24),
  },
  dot: {
    alignSelf: 'center',
    backgroundColor: colors.neutral.c300,
    borderRadius: s(100),
    height: s(4),
    width: s(4),
  },
  orderHeaderWrapper: {
    gap: s(8),
  },
  orderItem: {
    ...globalStyles.rowStart,
    gap: vs(6),
    paddingVertical: s(6),
  },
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(8),
  },
  rowOrderItem: {
    ...globalStyles.rowHBetween,
    flex: 1,
    gap: vs(12),
  },
  rowOrderWrapper: {
    flex: 1,
    gap: s(4),
  },
  variantWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(4),
  },
});

export default ReceiptDetailsOrderList;
