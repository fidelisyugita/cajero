import React from 'react';
import {StyleSheet, View} from 'react-native';

import {globalStyles} from '../../styles';

function OrderTransactionScreen(): JSX.Element {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
  },
});
export default OrderTransactionScreen;
