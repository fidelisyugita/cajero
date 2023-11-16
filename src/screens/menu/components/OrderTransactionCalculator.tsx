import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from 'reselect';

import {FlashList} from '@shopify/flash-list';

import Button from '../../../components/Button';
import Calculator from '../../../components/Calculator';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {useOrderPaymentMutation} from '../../../services/orderApi';
import {RootStateProps} from '../../../store';
import {setPaymentSuccessPopup} from '../../../store/menuOrderStore';
import {colors} from '../../../styles';
import {currencyPrice, formatNumber} from '../../../utils/convert';
import {s, vs} from '../../../utils/scale';
import {totalSelector} from '../Menu.selector';

const cashSuggestions = ['Exact', 12500, 15000, 2000];

type SuggestionCardProps = {
  item: string | number;
  onPress: Function;
};

const totalPaymentSelector = createSelector(
  [totalSelector, (state: RootStateProps) => state.menuOrder.paymentMethod],
  (total, paymentMethod) => ({
    paymentMethod,
    total,
  }),
);

function SuggestionCard({item, onPress}: SuggestionCardProps): JSX.Element {
  const total = useSelector(totalSelector);

  return (
    <Button
      containerStyle={styles.suggestion}
      size="large"
      variant="neutral"
      onPress={() => onPress(String(item === 'Exact' ? total : item))}>
      {typeof item === 'string' ? item : currencyPrice(item)}
    </Button>
  );
}

function OrderTransactionCalculator(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {paymentMethod, total} = useSelector(totalPaymentSelector);
  const [cash, setCash] = useState<string>('0');

  const [orderPaymentMutation] = useOrderPaymentMutation({
    fixedCacheKey: 'order-payment',
  });

  const orderPayment = async () => {
    try {
      await orderPaymentMutation({
        cash: Number(cash),
        orderId: '123',
        paymentMethod,
      });

      dispatch(setPaymentSuccessPopup(true));
    } catch (error) {
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chargeFrame}>
        <Text textStyle="heading2">
          {t('Charge')} {currencyPrice(total)}
        </Text>
      </View>
      <View style={styles.cashSuggestionsFrame}>
        <FlashList
          horizontal
          ItemSeparatorComponent={() => <Spacer width={16} />}
          contentContainerStyle={styles.cashContent}
          data={cashSuggestions}
          estimatedItemSize={s(60)}
          keyExtractor={item => String(item)}
          scrollEnabled={false}
          renderItem={({item}) => (
            <SuggestionCard item={item} onPress={setCash} />
          )}
        />
      </View>

      <View style={styles.valueFrame}>
        <Text textStyle="heading1">
          {cash ? formatNumber(Number(cash)) : '0'}
        </Text>
      </View>
      <View style={styles.calculatorFrame}>
        <Calculator setValue={setCash} />

        <Button
          disabled={Number(cash) < total || !paymentMethod}
          size="large"
          onPress={orderPayment}>
          {t('Pay')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calculatorFrame: {
    gap: s(24),
    paddingHorizontal: vs(24),
  },
  cashContent: {
    paddingHorizontal: vs(24),
  },
  cashSuggestionsFrame: {
    height: s(100),
    justifyContent: 'center',
  },
  chargeFrame: {
    backgroundColor: colors.supporting.red,
    borderTopLeftRadius: s(12),
    borderTopRightRadius: s(12),
    padding: s(24),
  },
  container: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(12),
    borderWidth: 1,
    width: vs(758),
  },
  suggestion: {
    width: vs(165.5),
  },
  valueFrame: {
    alignItems: 'flex-end',
    borderTopColor: colors.neutral.c300,
    borderTopWidth: 1,
    marginHorizontal: vs(24),
    paddingVertical: s(32),
  },
});
export default OrderTransactionCalculator;
