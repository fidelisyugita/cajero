import React from 'react';
import {StyleSheet, View} from 'react-native';

import {globalStyles} from '../../styles';

function StockScreen() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    backgroundColor: 'blue',
  },
});

export default StockScreen;
