import React from 'react';
import {useTranslation} from 'react-i18next';

import {createSideTabNavigator} from '../components/SideTabNavigator';
import {SideNavigatorParamList} from '../interfaces/NavigationInterface';
import MenuScreen from '../screens/menu/MenuScreen';
import ReceiptScreen from '../screens/receipt/ReceiptScreen';
import StockScreen from '../screens/stock/StockScreen';

const Side = createSideTabNavigator<SideNavigatorParamList>();

function SideNavigator(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Side.Navigator>
      <Side.Screen
        component={MenuScreen}
        name="MenuScreen"
        options={{title: t('Menu')}}
      />
      <Side.Screen
        component={ReceiptScreen}
        name="ReceiptScreen"
        options={{title: t('Receipts')}}
      />
      <Side.Screen
        component={StockScreen}
        name="StockScreen"
        options={{title: t('Stock')}}
      />
      <Side.Screen
        component={StockScreen}
        name="ExpenseScreen"
        options={{title: t('Expenses')}}
      />
      <Side.Screen
        component={StockScreen}
        name="ReportScreen"
        options={{title: t('Report')}}
      />
      <Side.Screen
        component={StockScreen}
        name="BusinessScreen"
        options={{title: t('Business')}}
      />
      <Side.Screen
        component={StockScreen}
        name="SettingScreen"
        options={{title: t('Settings')}}
      />
    </Side.Navigator>
  );
}

export default SideNavigator;
