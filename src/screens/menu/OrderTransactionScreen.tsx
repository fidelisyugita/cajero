import React from 'react';
import {StyleSheet, View} from 'react-native';

import {globalStyles} from '../../styles';
import {s} from '../../utils/scale';
import OrderTransactionCalculator from './components/OrderTransactionCalculator';
import OrderTransactionPaymentMethod from './components/OrderTransactionPaymentMethod';
import PaymentSuccessPopup from './components/PaymentSuccessPopup';

function OrderTransactionScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <OrderTransactionPaymentMethod />
      <OrderTransactionCalculator />
      <PaymentSuccessPopup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    padding: s(24),
    ...globalStyles.rowBetween,
    alignItems: 'stretch',
  },
});
export default OrderTransactionScreen;
