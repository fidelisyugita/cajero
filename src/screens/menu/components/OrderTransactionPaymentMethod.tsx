import React, {useTransition} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {FlashList} from '@shopify/flash-list';

import Button from '../../../components/Button';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {RootStateProps} from '../../../store';
import {setPaymentMethod} from '../../../store/menuOrderStore';
import {colors} from '../../../styles';
import {s, vs} from '../../../utils/scale';

const paymentMethod = [
  {
    id: 'cash',
    name: 'Cash',
  },
  {
    id: 'qris',
    name: 'QRIS',
  },
  {
    id: 'bamk-transfer',
    name: 'Bank Transfer',
  },
];

type PaymentMethodCardProps = {
  item: {
    id: string;
    name: string;
  };
};

function PaymentMethodCard({item}: PaymentMethodCardProps): JSX.Element {
  const {id, name} = item;
  const dispatch = useDispatch();
  const active = useSelector(
    (state: RootStateProps) => state.menuOrder.paymentMethod === id,
  );

  return (
    <Button
      size="large"
      variant={active ? 'soft' : 'neutral'}
      onPress={() => dispatch(setPaymentMethod(id))}>
      {name}
    </Button>
  );
}

function OrderTransactionPaymentMethod(): JSX.Element {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text textStyle="heading3">{t('Select Payment Method')}</Text>

      <Spacer height={24} />

      <FlashList
        ItemSeparatorComponent={() => <Spacer height={16} />}
        data={paymentMethod}
        estimatedItemSize={s(60)}
        keyExtractor={item => item.id}
        renderItem={({item}) => <PaymentMethodCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(12),
    borderWidth: 1,
    padding: s(24),
    width: vs(536),
  },
});
export default OrderTransactionPaymentMethod;
