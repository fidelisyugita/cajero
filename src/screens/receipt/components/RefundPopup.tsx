import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {FlashList} from '@shopify/flash-list';

import Button from '../../../components/Button';
import OrderItem, {OrderItemProps} from '../../../components/OrderItem';
import Popup from '../../../components/Popup';
import Text from '../../../components/Text';
import {RootStateProps} from '../../../store';
import {
  selectAllRefundItems,
  selectRefundItem,
  setRefundPopupVisible,
} from '../../../store/refundStore';
import {globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';
import {orderList} from '../Receipt.dummy';

type SelectOrderItemProps = {
  item: OrderItemProps['item'];
};

function ListHeader(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const active = useSelector(
    (state: RootStateProps) =>
      state.refund.selectedRefundItems.length !== orderList.length,
  );

  const list = orderList.map(item => item.id);

  return (
    <Button
      size="medium"
      style={styles.btnSelectAll}
      variant="link"
      onPress={() => dispatch(selectAllRefundItems(active ? list : []))}>
      {t(active ? 'Select All' : 'Deselect All')}
    </Button>
  );
}

function SelectOrderItem({item}: SelectOrderItemProps) {
  const dispatch = useDispatch();
  const isChecked = useSelector((state: RootStateProps) =>
    state.refund.selectedRefundItems.includes(item.id),
  );

  return (
    <TouchableRipple
      style={styles.touchOrderItem}
      onPress={() => dispatch(selectRefundItem(item.id))}>
      <View style={styles.orderItem}>
        <OrderItem hasCheckbox isChecked={isChecked} item={item} />
      </View>
    </TouchableRipple>
  );
}

function RefundPopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {active, refundPopupVisible} = useSelector(
    (state: RootStateProps) => ({
      active: state.refund.selectedRefundItems.length > 0,
      refundPopupVisible: state.refund.popupVisible,
    }),
    shallowEqual,
  );

  const onClose = () => {
    dispatch(setRefundPopupVisible(false));
  };

  const onCancel = () => {
    onClose();
    dispatch(selectAllRefundItems([]));
  };

  return (
    <Popup height={718} visible={refundPopupVisible} width={581}>
      <Popup.Header title={t('Refund')} onClose={onClose} />
      <Popup.Body>
        <View style={styles.headerWrapper}>
          <Text textStyle="heading3">{t('Transaction No. ')}201023-0007</Text>
          <Text color="neutral.c600" textStyle="bodyTextMedium">
            Fri, 20 Oct 2023 - 11.42
          </Text>
        </View>
        <View style={styles.listWrapper}>
          <FlashList
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.listContent}
            data={orderList}
            estimatedItemSize={s(66)}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => <SelectOrderItem item={item} />}
          />
        </View>
      </Popup.Body>
      <Popup.Footer style={styles.footer}>
        <Button
          containerStyle={globalStyles.flex}
          disabled={!active}
          size="medium"
          variant="secondary"
          onPress={onCancel}>
          {t('Cancel')}
        </Button>
        <Button
          containerStyle={globalStyles.flex}
          disabled={!active}
          size="medium"
          variant="primary">
          {t('Refund')}
        </Button>
      </Popup.Footer>
    </Popup>
  );
}

const styles = StyleSheet.create({
  btnSelectAll: {
    alignSelf: 'flex-start',
    marginBottom: s(14),
    marginLeft: s(16),
    marginRight: s(24),
    zIndex: 3,
  },
  footer: {
    ...globalStyles.rowBetween,
    flex: 1,
    gap: vs(16),
  },
  headerWrapper: {
    gap: s(12),
    marginBottom: s(32),
    paddingHorizontal: vs(24),
  },
  listContent: {},
  listWrapper: {
    height: s(404),
  },
  orderItem: {
    paddingHorizontal: vs(24),
  },
  touchOrderItem: {},
});
export default RefundPopup;
