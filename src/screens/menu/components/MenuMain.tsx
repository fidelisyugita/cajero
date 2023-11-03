import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Spacer from '../../../components/Spacer';
import {vs} from '../../../utils/scale';
import MenuCategories from './MenuCategories';
import MenuHeader from './MenuHeader';
import MenuProductList from './MenuProductList';

function MenuMain() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <MenuHeader />
      <MenuCategories />
      <MenuProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: vs(910),
  },
});

export default MenuMain;
