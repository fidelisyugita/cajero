import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Spacer from '../../components/Spacer';
import Table from '../../components/Table';
import {colors, globalStyles} from '../../styles';
import {vs} from '../../utils/scale';
import {ReceiptProps} from './Receipt.type';
import ReceiptHeader from './components/ReceiptHeader';
import ReceiptSeeDetailsCell from './components/ReceiptSeeDetailsCell';
import ReceiptStatusCell from './components/ReceiptStatusCell';

const headers = [
  {id: 'time', label: 'Time', width: vs(120)},
  {id: 'trxNumber', label: 'Transaction Number', width: vs(160)},
  {id: 'customerName', label: 'Customer', width: vs(160)},
  {id: 'paymentMethod', label: 'Payment Method', width: vs(132)},
  {id: 'totalPrice', label: 'Total Price', width: vs(103)},
  {
    CustomComponent: ReceiptStatusCell,
    id: 'status',
    label: 'Status',
    width: vs(96),
  },
  {
    CustomComponent: ReceiptSeeDetailsCell,
    id: 'action',
    label: 'Action',
    width: vs(115),
  },
];

const datas: ReceiptProps[] = [
  {
    action: 'See Details',
    customerName: 'Annette B',
    id: 1,
    paymentMethod: 'Cash',
    status: 'Refund',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 420000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 2,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 3,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 4,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 5,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 6,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 7,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 8,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 9,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 10,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 11,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
  {
    action: 'See Details',
    customerName: 'Annette Black',
    id: 12,
    paymentMethod: 'Cash',
    status: 'Completed',
    time: '15.04\nFri, 20 Oct 2023',
    totalPrice: 42000,
    trxNumber: '201023-0014',
  },
];

function ReceiptScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const insetsTop =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  return (
    <View style={[styles.container, {paddingTop: insetsTop}]}>
      <ReceiptHeader />
      <Spacer height={28} />
      <View style={styles.content}>
        <Table data={datas} gap={vs(44)} headers={headers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    backgroundColor: colors.neutral.c200,
  },
  content: {
    flex: 1,
    paddingLeft: vs(22),
    paddingRight: vs(24),
  },
});

export default ReceiptScreen;
