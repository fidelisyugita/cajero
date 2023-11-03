import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import {IcCheckbox, IcCheckboxOutline} from '../assets/svgs';
import {colors, globalStyles} from '../styles';
import {currencyPrice} from '../utils/convert';
import {s, vs} from '../utils/scale';
import ConditionalRender from './ConditionalRender';
import Spacer from './Spacer';
import Text from './Text';

export type OrderItemProps = {
  item: OrderProps;
  hasCheckbox?: boolean;
  isChecked?: boolean;
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

function OrderItem({
  hasCheckbox = false,
  isChecked = false,
  item,
}: OrderItemProps): JSX.Element {
  const {t} = useTranslation();
  const {discount, price, productName, qty, variant} = item;

  return (
    <View style={styles.orderItem}>
      <ConditionalRender condition={hasCheckbox}>
        <View style={globalStyles.rowHCenter}>
          {isChecked ? (
            <IcCheckbox height={s(32)} width={s(32)} />
          ) : (
            <IcCheckboxOutline height={s(32)} width={s(32)} />
          )}
          <Spacer width={6} />
        </View>
      </ConditionalRender>
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

const styles = StyleSheet.create({
  dot: {
    alignSelf: 'center',
    backgroundColor: colors.neutral.c300,
    borderRadius: s(100),
    height: s(4),
    width: s(4),
  },
  orderItem: {
    ...globalStyles.rowStart,
    gap: vs(6),
    paddingVertical: s(6),
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

export default memo(OrderItem);
