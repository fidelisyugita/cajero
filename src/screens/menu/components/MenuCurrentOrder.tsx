import dayjs from 'dayjs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {createSelector} from '@reduxjs/toolkit';
import {FlashList} from '@shopify/flash-list';

import {IcArrowCircleRight, IcTable, IcUser} from '../../../assets/svgs';
import Button from '../../../components/Button';
import DashedLine from '../../../components/DashedLine';
import InputField2 from '../../../components/InputField.2';
import OrderCard from '../../../components/OrderCard';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {RootStateProps} from '../../../store';
import {
  setCustomerName,
  setRemoveAllOrderListPopup,
  setTableNumber,
} from '../../../store/menuOrderStore';
import {colors, globalStyles} from '../../../styles';
import {currencyPrice} from '../../../utils/convert';
import {s, vs} from '../../../utils/scale';

type SummaryItemProps = {
  label: string;
  value: string;
};

const subtotalSelector = (state: RootStateProps) =>
  state.menuOrder.orderList.reduce((acc, ol) => acc + ol.totalPrice, 0);

const orderSelector = createSelector([subtotalSelector], state => ({
  subtotal: state,
}));

function OrderSummary(): JSX.Element {
  const {t} = useTranslation();

  const {subtotal} = useSelector(orderSelector);

  return (
    <View style={styles.orderSummary}>
      <View style={styles.summaryWrapper}>
        <SummaryItem
          label={t('Subtotal')}
          value={subtotal ? currencyPrice(subtotal) : '-'}
        />
        <SummaryItem label={t('Discount')} value="-" />
        <SummaryItem label={t('Tax')} value="-" />
      </View>
      <View style={styles.summarySeparator}>
        <View style={[styles.ballCut, styles.ballLeft]} />
        <DashedLine dashLength={vs(10)} dashThickness={s(2)} />
        <View style={[styles.ballCut, styles.ballRight]} />
      </View>

      <View style={globalStyles.rowBetween}>
        <Text textStyle="heading5">{t('Total')}</Text>
        <Text color="primary.c400" textStyle="heading5">
          -
        </Text>
      </View>
    </View>
  );
}

function SummaryItem({label, value = '-'}: SummaryItemProps): JSX.Element {
  return (
    <View style={globalStyles.rowBetween}>
      <Text textStyle="bodyTextSmall">{label}</Text>
      <Text textStyle="labelSmall">{value}</Text>
    </View>
  );
}

function separator() {
  return <Spacer height={8} />;
}

function ListFooterComponent(): JSX.Element {
  const {t} = useTranslation();

  const disabled = useSelector(
    (state: RootStateProps) => state.menuOrder.orderList.length < 1,
  );

  return (
    <>
      <Spacer height={20} />
      <Text textStyle="labelMedium">{t('Add')}</Text>
      <Spacer height={12} />
      <View style={globalStyles.rowBetween}>
        <Button
          containerStyle={globalStyles.flex}
          disabled={disabled}
          size="small"
          variant="secondary">
          {t('Discount')}
        </Button>
      </View>

      <Spacer height={16} />

      <Text textStyle="labelMedium">{t('Order Summary')}</Text>
      <Spacer height={12} />
      <OrderSummary />
    </>
  );
}

function OrderList(): JSX.Element {
  const orderList = useSelector(
    (state: RootStateProps) => state.menuOrder.orderList,
  );

  return (
    <View style={styles.list}>
      <FlashList
        ItemSeparatorComponent={separator}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.content}
        data={orderList}
        estimatedItemSize={100}
        keyExtractor={item => item.productOrderId}
        renderItem={({item}) => <OrderCard item={item} />}
      />
    </View>
  );
}

function MenuCurrentOrder(): JSX.Element {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const disabled = useSelector(
    (state: RootStateProps) => state.menuOrder.orderList.length < 1,
  );

  return (
    <Surface
      elevation={1}
      style={[styles.orderContainer, {paddingTop: insets.top}]}
      theme={{
        colors: {
          elevation: {
            level1: colors.neutral.c100,
          },
        },
      }}>
      <View>
        <View style={styles.topWrapper}>
          <Text color="neutral.c700" textStyle="heading3">
            {t('Current Order')}
          </Text>
          <Spacer height={8} />
          <Text color="neutral.c600" textStyle="bodyTextSmall">
            {dayjs().format('dddd, DD MMMM YYYY')}
          </Text>
          <Spacer height={20} />
          <View style={styles.formCustomer}>
            <InputField2
              autoCorrect={false}
              containerStyle={styles.customerField}
              maxLength={20}
              placeholder={t('Customer Name')}
              size="small"
              left={
                <IcUser
                  color={colors.neutral.c600}
                  height={s(20)}
                  width={s(20)}
                />
              }
              onChangeText={val => dispatch(setCustomerName(val))}
            />
            <InputField2
              containerStyle={styles.tableField}
              keyboardType="number-pad"
              maxLength={3}
              size="small"
              left={
                <IcTable
                  color={colors.neutral.c600}
                  height={s(20)}
                  width={s(20)}
                />
              }
              onChangeText={val => dispatch(setTableNumber(val))}
            />
          </View>

          <Spacer height={20} />

          <View style={globalStyles.rowBetween}>
            <Text textStyle="labelMedium">{t('Order List')}</Text>

            <Button
              disabled={disabled}
              size="small"
              variant="link"
              onPress={() => dispatch(setRemoveAllOrderListPopup(true))}>
              {t('Remove All')}
            </Button>
          </View>
        </View>

        <Spacer height={16} />
        <OrderList />
      </View>
      <View style={styles.outerFooter}>
        <Surface
          elevation={1}
          style={styles.footer}
          theme={{
            colors: {
              elevation: {
                level1: colors.neutral.c100,
              },
            },
          }}>
          <Button
            disabled
            containerStyle={globalStyles.flex}
            size="medium"
            variant="primary"
            left={
              <IcArrowCircleRight
                color={colors.primary.c100}
                height={s(20)}
                width={s(20)}
              />
            }>
            {t('Proceed')}
          </Button>
        </Surface>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  ballCut: {
    backgroundColor: colors.neutral.c100,
    borderRadius: s(100),
    height: s(24),
    position: 'absolute',
    width: s(24),
    zIndex: 5,
  },
  ballLeft: {
    left: -vs(24),
  },
  ballRight: {
    right: -vs(24),
  },
  content: {
    paddingBottom: s(24),
    paddingHorizontal: vs(24),
  },
  customerField: {
    width: vs(198),
  },
  footer: {
    gap: vs(16),
    paddingBottom: s(24),
    paddingHorizontal: vs(24),
    paddingTop: s(12),
    ...globalStyles.rowBetween,
  },
  formCustomer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(12),
    justifyContent: 'space-between',
  },
  list: {
    height: s(730),
  },
  orderContainer: {
    backgroundColor: colors.neutral.c100,
    flex: 1,
    height: '100%',
  },
  orderSummary: {
    backgroundColor: colors.supporting.yellow,
    borderRadius: s(8),
    padding: s(12),
  },
  outerFooter: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    paddingTop: vs(3),
    position: 'absolute',
    right: 0,
  },
  summarySeparator: {
    height: s(24),
    justifyContent: 'center',
  },
  summaryWrapper: {
    gap: s(8),
  },
  tableField: {
    width: vs(80),
  },
  topWrapper: {
    paddingHorizontal: vs(24),
  },
});

export default MenuCurrentOrder;
