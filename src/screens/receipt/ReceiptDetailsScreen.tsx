import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {IcPrint, IcRefund} from '../../assets/svgs';
import Button from '../../components/Button';
import DashedLine from '../../components/DashedLine';
import Spacer from '../../components/Spacer';
import StatusCard from '../../components/StatusCard';
import Text from '../../components/Text';
import {setRefundPopupVisible} from '../../store/refundStore';
import {colors, globalStyles} from '../../styles';
import {s, vs} from '../../utils/scale';
import ReceiptDetailsOrderList from './components/ReceiptDetailsOrderList';
import RefundPopup from './components/RefundPopup';

function ReceiptDetailsScreen(): JSX.Element {
  const {t} = useTranslation();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <RefundPopup />
      <View style={globalStyles.rowBetween}>
        <Text textStyle="heading3">Transaction No. 201023-0007</Text>
        <StatusCard status="completed" />
      </View>
      <Spacer height={12} />
      <Text color="neutral.c600" textStyle="bodyTextMedium">
        Fri, 20 Oct 2023 - 11.42
      </Text>
      <Spacer height={24} />

      <View style={styles.content}>
        <ReceiptDetailsOrderList />
        <View style={globalStyles.flex}>
          <View style={styles.summaryCard}>
            <Spacer height={24} />
            <View style={globalStyles.rowItem}>
              <Text textStyle="heading5">{t('Subtotal')}</Text>
              <Text textStyle="heading4">Rp 59.900</Text>
            </View>
            <Spacer height={8} />
            <View style={globalStyles.rowItem}>
              <Text color="success.c400" textStyle="bodyTextLarge">
                {t('Discount')}: Holiday Saving
              </Text>
              <Text color="success.c400" textStyle="labelLarge">
                -Rp 8.000
              </Text>
            </View>
            <Spacer height={8} />
            <View style={globalStyles.rowItem}>
              <Text color="neutral.c500" textStyle="bodyTextLarge">
                {t('Tax')}: Property Tax
              </Text>
              <Text color="neutral.c500" textStyle="labelLarge">
                Rp 3.000
              </Text>
            </View>

            <DashedLine
              dashGap={1}
              dashStyle={styles.dash}
              dashThickness={1}
              style={styles.dashWrapper}
            />

            <View style={globalStyles.rowItem}>
              <Text color="primary.c400" textStyle="heading5">
                {t('Total Price')}
              </Text>
              <Text color="primary.c400" textStyle="heading2">
                Rp 54.900
              </Text>
            </View>
          </View>

          <View style={styles.refundCard}>
            <View style={styles.icRefundOuter}>
              <IcRefund
                color={colors.primary.c400}
                height={s(24)}
                width={s(24)}
              />
            </View>
            <View style={globalStyles.flex}>
              <View style={globalStyles.rowItem}>
                <Text textStyle="labelLarge">{t('Refund')} 201023-0008</Text>
                <Text color="error.c400" textStyle="heading4">
                  -Rp 20.000
                </Text>
              </View>
              <View style={globalStyles.rowItem}>
                <Text color="neutral.c600" textStyle="bodyTextSmall">
                  Fri, 20 Oct 2023 - 11.42
                </Text>
                <Text color="neutral.c600" textStyle="bodyTextSmall">
                  {t('Refunded')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Surface
        elevation={1}
        style={[styles.footer]}
        theme={{
          colors: {
            elevation: {
              level1: colors.supporting.yellow,
            },
          },
        }}>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="secondary"
          left={
            <IcRefund
              color={colors.primary.c400}
              height={s(20)}
              width={s(20)}
            />
          }
          onPress={() => dispatch(setRefundPopupVisible(true))}>
          {t('Refund')}
        </Button>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          left={
            <IcPrint color={colors.neutral.c100} height={s(20)} width={s(20)} />
          }>
          {t('Print Receipt')}
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    paddingHorizontal: vs(136),
    paddingTop: s(24),
  },
  content: {
    ...globalStyles.rowHBetween,
    alignItems: 'flex-start',
    gap: vs(20),
  },
  dash: {
    backgroundColor: colors.neutral.c400,
    borderRadius: 0,
  },
  dashWrapper: {
    marginVertical: s(16),
  },
  footer: {
    backgroundColor: colors.neutral.c100,
    bottom: 0,
    flexDirection: 'row',
    gap: vs(16),
    height: s(100),
    justifyContent: 'space-between',
    left: 0,
    padding: s(24),
    position: 'absolute',
    right: 0,
  },
  icRefundOuter: {
    padding: s(4),
  },
  refundCard: {
    alignItems: 'flex-start',
    backgroundColor: colors.primary.c100,
    borderColor: colors.primary.c400,
    borderRadius: s(4),
    borderWidth: 1,
    flexDirection: 'row',
    gap: vs(9),
    marginTop: s(20),
    paddingHorizontal: vs(20),
    paddingVertical: s(12),
  },
  summaryCard: {
    ...globalStyles.card,
  },
});

export default ReceiptDetailsScreen;
