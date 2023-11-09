import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {IcCaretDown, IcCaretRight, IcEdit, IcTrash} from '../assets/svgs';
import {ProductOrderProps} from '../interfaces/CommonInterface';
import {removeProductFromOrderList} from '../store/menuOrderStore';
import {colors, globalStyles} from '../styles';
import {currencyPrice} from '../utils/convert';
import {s, vs} from '../utils/scale';
import Button from './Button';
import ConditionalRender from './ConditionalRender';
import Spacer from './Spacer';
import Text from './Text';

type OrderCardProps = {
  item: ProductOrderProps;
};
function discountTransform(discount: {
  type: 'amount' | 'percent';
  value: string;
}) {
  if (discount?.type === 'amount') {
    return currencyPrice(Number(discount.value));
  }
  if (discount?.type === 'percent') {
    return `${discount.value}%`;
  }
  return '-';
}

function getTotalSelectedVariantPrice(variants: ProductOrderProps['variants']) {
  let totalPrice = 0;
  if (variants) {
    Object.keys(variants).map(variant => {
      totalPrice += variants[variant]?.selected.reduce((acc, variantItem) => {
        return acc + variants[variant].items[variantItem].price;
      }, 0);
    });
  }

  return totalPrice;
}

function getFinalPriceItem(item: ProductOrderProps) {
  const {discount, price, qty, variants} = item;
  const discountValue =
    discount?.type === 'amount'
      ? Number(discount.value || 0)
      : (Number(discount?.value || 0) / 100) * price;

  const variantValue = getTotalSelectedVariantPrice(variants);

  const totalPrice = (price - discountValue + variantValue) * qty;

  return currencyPrice(totalPrice);
}

function OrderCard({item}: OrderCardProps): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {discount, name, note, productOrderId, qty, variants} = item;

  const [isOpen, setOpen] = useState<boolean>(false);

  const finalPriceItem = getFinalPriceItem(item);

  return (
    <TouchableRipple
      borderless
      style={styles.touch}
      onPress={() => setOpen(v => !v)}>
      <View style={styles.container}>
        <View style={[globalStyles.rowHBetween, globalStyles.flex]}>
          <View style={[globalStyles.row, globalStyles.shrink]}>
            <View style={styles.caretFrame}>
              {isOpen ? (
                <IcCaretDown
                  color={colors.neutral.c600}
                  height={s(16)}
                  width={s(16)}
                />
              ) : (
                <IcCaretRight
                  color={colors.neutral.c600}
                  height={s(16)}
                  width={s(16)}
                />
              )}
            </View>
            <Spacer width={8} />
            <Text textStyle="heading5">{qty}</Text>
            <Spacer width={6} />
            <Text
              numberOfLines={2}
              style={globalStyles.shrink}
              textStyle="heading5">
              {name}
            </Text>
          </View>
          <Spacer width={12} />
          <Text textStyle="heading5">{finalPriceItem}</Text>
        </View>

        <View style={styles.detailsFrame}>
          {Object.keys(variants).map(variant => {
            const selectedVariantItems = Object.keys(variants[variant].items)
              .filter(variantItem =>
                variants[variant].selected?.includes(variantItem),
              )
              .map(variantItem => {
                const selectedVariant = variants[variant].items[variantItem];
                return {
                  name: selectedVariant.name,
                  price: selectedVariant.price,
                };
              });

            const variantNames = selectedVariantItems
              .map(vari => vari.name)
              .join(', ');

            const totalVariantPrice = selectedVariantItems.reduce(
              (acc, vari) => acc + vari.price,
              0,
            );

            if (
              !variants[variant]?.selected ||
              variants[variant]?.selected?.length < 1
            ) {
              return null;
            }

            return (
              <View key={variant} style={styles.variantFrame}>
                <View style={styles.variantItemFrame}>
                  <Text color="neutral.c500" textStyle="labelXSmall">
                    {variants[variant].name}
                  </Text>
                  <View style={styles.dot} />
                  <Text color="neutral.c500" textStyle="labelXSmall">
                    {variantNames}
                  </Text>
                </View>
                <Text color="neutral.c500" textStyle="labelXSmall">
                  {currencyPrice(totalVariantPrice)}
                </Text>
              </View>
            );
          })}

          <View style={styles.variantFrame}>
            <Text color="success.c400" textStyle="bodyTextSmall">
              {t('Discount')}
            </Text>
            <Text color="success.c400" textStyle="bodyTextSmall">
              {discountTransform(discount)}
            </Text>
          </View>

          <Text color="neutral.c600" textStyle="bodyTextSmall">
            {note || '-'}
          </Text>
        </View>

        <ConditionalRender condition={isOpen}>
          <View style={styles.actionFrame}>
            <Button
              containerStyle={globalStyles.flex}
              size="small"
              variant="positif"
              left={
                <IcEdit
                  color={colors.neutral.c100}
                  height={s(16)}
                  width={s(16)}
                />
              }>
              {t('Edit')}
            </Button>
            <Button
              containerStyle={globalStyles.flex}
              size="small"
              variant="warning"
              left={
                <IcTrash
                  color={colors.neutral.c100}
                  height={s(16)}
                  width={s(16)}
                />
              }
              onPress={() =>
                dispatch(removeProductFromOrderList(productOrderId))
              }>
              {t('Delete')}
            </Button>
          </View>
        </ConditionalRender>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  actionFrame: {
    borderTopColor: colors.neutral.c300,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: vs(12),
    justifyContent: 'space-between',
    paddingTop: s(12),
  },
  caretFrame: {
    height: s(24),
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.neutral.c200,
    borderBottomColor: colors.primary.c400,
    borderBottomWidth: 1,
    borderLeftColor: colors.neutral.c300,
    borderLeftWidth: 1,
    borderRadius: s(8),
    borderRightColor: colors.neutral.c300,
    borderRightWidth: 1,
    borderTopColor: colors.neutral.c300,
    borderTopWidth: 1,
    gap: vs(8),
    overflow: 'hidden',
    padding: s(12),
  },
  detailsFrame: {
    gap: s(4),
    marginLeft: vs(24),
  },
  dot: {
    backgroundColor: colors.neutral.c300,
    borderRadius: s(100),
    height: s(4),
    width: s(4),
  },
  touch: {borderRadius: s(8)},
  variantFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    justifyContent: 'space-between',
  },
  variantItemFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(4),
  },
});

export default memo(OrderCard);
