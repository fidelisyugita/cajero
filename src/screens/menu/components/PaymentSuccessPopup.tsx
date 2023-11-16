import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/core';

import {IcPlus, IcPrint, IcSuccess} from '../../../assets/svgs';
import Button from '../../../components/Button';
import DashedLine from '../../../components/DashedLine';
import Popup from '../../../components/Popup';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {useOrderPaymentMutation} from '../../../services/orderApi';
import {RootStateProps} from '../../../store';
import {resetOrderState} from '../../../store/menuOrderStore';
import {colors, globalStyles} from '../../../styles';
import {currencyPrice} from '../../../utils/convert';
import {s, vs} from '../../../utils/scale';

function PaymentSuccessPopup(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: RootStateProps) => state.menuOrder.paymentSuccessPopup,
  );

  const [_, {data}] = useOrderPaymentMutation({
    fixedCacheKey: 'order-payment',
  });

  return (
    <Popup height={768} visible={visible} width={537}>
      <Popup.Body>
        <View style={globalStyles.alignCenter}>
          <IcSuccess height={s(180)} width={s(180)} />
          <Spacer height={32} />
          <Text textStyle="heading2">{t('Payment Success!')}</Text>
          <Spacer height={20} />
          <Text textStyle="bodyTextLarge">
            Transaction No. {data?.transactionID}
          </Text>
          <Spacer height={12} />
          <Text textStyle="bodyTextMedium">{data?.date || '-'}</Text>
          <Spacer height={24} />
        </View>

        <View style={styles.detailsFrame}>
          <View style={styles.detailsGap}>
            <View style={styles.detailsItemFrame}>
              <Text textStyle="heading5">{t('Subtotal')}</Text>
              <Text textStyle="heading4">
                {' '}
                {data?.subtotal ? currencyPrice(data.subtotal) : '-'}
              </Text>
            </View>
            <View style={styles.detailsItemFrame}>
              <Text color="success.c400" textStyle="bodyTextLarge">
                {t('Discount')}{' '}
                {data?.discount ? `: ${data?.discount.name}` : ''}
              </Text>
              <Text color="success.c400" textStyle="labelLarge">
                {data?.discount ? data.discount.valueDisplay : '-'}
              </Text>
            </View>
            <View style={styles.detailsItemFrame}>
              <Text color="neutral.c500" textStyle="bodyTextLarge">
                {t('Tax')}
              </Text>
              <Text color="neutral.c500" textStyle="labelLarge">
                {data?.tax ? currencyPrice(data.tax) : '-'}
              </Text>
            </View>
          </View>

          <DashedLine
            dashGap={1}
            dashStyle={styles.dash}
            dashThickness={1}
            style={styles.dashWrapper}
          />

          <View style={styles.detailsGap}>
            <View style={styles.detailsItemFrame}>
              <Text color="primary.c400" textStyle="heading5">
                {t('Total Price')}
              </Text>
              <Text color="primary.c400" textStyle="heading2">
                {data?.totalPrice ? currencyPrice(data.totalPrice) : '-'}
              </Text>
            </View>
            <View style={styles.detailsItemFrame}>
              <Text color="neutral.c500" textStyle="bodyTextLarge">
                {t('Cash')}
              </Text>
              <Text color="neutral.c500" textStyle="labelLarge">
                {data?.cash ? currencyPrice(data.cash) : '-'}
              </Text>
            </View>
            <View style={styles.detailsItemFrame}>
              <Text color="neutral.c500" textStyle="bodyTextLarge">
                {t('Change')}
              </Text>
              <Text color="neutral.c500" textStyle="labelLarge">
                {data?.change ? currencyPrice(data.change) : '0'}
              </Text>
            </View>
          </View>
        </View>
      </Popup.Body>

      <Popup.Footer style={styles.footer}>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="secondary"
          left={
            <IcPlus color={colors.primary.c400} height={s(20)} width={s(20)} />
          }
          onPress={() => {
            dispatch(resetOrderState());
            setTimeout(() => {
              navigation.navigate('SideNavigator', {
                screen: 'MenuScreen',
              });
            }, 300);
          }}>
          {t('New Transaction')}
        </Button>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="primary"
          left={
            <IcPrint color={colors.neutral.c100} height={s(20)} width={s(20)} />
          }
          onPress={() => {}}>
          {t('Print Receipt')}
        </Button>
      </Popup.Footer>
    </Popup>
  );
}
const styles = StyleSheet.create({
  dash: {
    backgroundColor: colors.neutral.c400,
    borderRadius: 0,
  },
  dashWrapper: {
    marginVertical: s(16),
  },
  detailsFrame: {
    backgroundColor: colors.neutral.c100,
    paddingHorizontal: vs(24),
    paddingVertical: s(24),
  },
  detailsGap: {
    gap: s(8),
  },
  detailsItemFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(20),
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    justifyContent: 'space-between',
  },
});

export default PaymentSuccessPopup;
