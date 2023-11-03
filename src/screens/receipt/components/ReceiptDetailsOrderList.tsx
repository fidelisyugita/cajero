import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import {FlashList} from '@shopify/flash-list';

import {IcTable, IcUser} from '../../../assets/svgs';
import OrderItem from '../../../components/OrderItem';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {colors, globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';
import {orderList} from '../Receipt.dummy';

function OrderHeader(): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.orderHeaderWrapper}>
        <View style={styles.rowItem}>
          <IcUser color={colors.neutral.c500} height={s(20)} width={s(20)} />
          <Text textStyle="bodyTextLarge">Eleanor Pena</Text>
        </View>
        <View style={styles.rowItem}>
          <IcTable color={colors.neutral.c500} height={s(20)} width={s(20)} />
          <Text textStyle="bodyTextLarge">12</Text>
        </View>

        <Text textStyle="bodyTextLarge">
          {t('Payment Method')} : Bank Transfer
        </Text>
      </View>
      <Spacer height={12} />
      <View style={globalStyles.horizontalLine} />
      <Spacer height={12} />

      <Text textStyle="labelMedium">{t('Order List')}</Text>
      <Spacer height={12} />
    </>
  );
}

function separator() {
  return <View style={globalStyles.horizontalLine} />;
}

function ReceiptDetailsOrderList(): JSX.Element {
  return (
    <View style={styles.container}>
      <FlashList
        ItemSeparatorComponent={separator}
        ListHeaderComponent={OrderHeader}
        contentContainerStyle={styles.content}
        data={orderList}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <OrderItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(8),
    borderWidth: 1,
    flex: 1,
    minHeight: s(500),
  },
  content: {
    minHeight: s(500),
    padding: s(24),
  },
  orderHeaderWrapper: {
    gap: s(8),
  },
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(8),
  },
});

export default ReceiptDetailsOrderList;
