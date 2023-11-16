import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, globalStyles} from '../../styles';
import DeleteProductDiscountPopup from './components/DeleteProductDiscountPopup';
import MenuAddProductPopup from './components/MenuAddProductPopup';
import MenuCurrentOrder from './components/MenuCurrentOrder';
import MenuMain from './components/MenuMain';
import MenuProductDiscountPopup from './components/MenuProductDiscountPopup';
import RemoveAllOrderListPopup from './components/RemoveAllOrderListPopup';

function MenuScreen(): JSX.Element {
  return (
    <View style={globalStyles.flex}>
      <MenuAddProductPopup />
      <RemoveAllOrderListPopup />
      <MenuProductDiscountPopup />
      <DeleteProductDiscountPopup />
      <View style={styles.container}>
        <MenuMain />
        <MenuCurrentOrder />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    backgroundColor: colors.neutral.c200,
    flexDirection: 'row',
  },
});

export default MenuScreen;
