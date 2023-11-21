import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {globalStyles} from '../../styles';
import {s} from '../../utils/scale';
import OrderTransactionCalculator from './components/OrderTransactionCalculator';
import OrderTransactionPaymentMethod from './components/OrderTransactionPaymentMethod';
import PaymentSuccessPopup from './components/PaymentSuccessPopup';

function OrderTransactionScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <OrderTransactionPaymentMethod />
        <OrderTransactionCalculator />
        <PaymentSuccessPopup />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
  },
  content: {
    ...globalStyles.rowBetween,
    padding: s(24),
  },
});
export default OrderTransactionScreen;
