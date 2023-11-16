import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import Button from '../../../components/Button';
import Popup from '../../../components/Popup';
import Text from '../../../components/Text';
import {useDeleteDiscountMutation} from '../../../services/discountApi';
import {RootStateProps} from '../../../store';
import {setOrderDiscount} from '../../../store/menuOrderStore';
import {
  setDeleteDiscountPopup,
  setOrderDiscountPopup,
} from '../../../store/orderDiscountStore';
import {globalStyles} from '../../../styles';
import {vs} from '../../../utils/scale';

function DeleteProductDiscountPopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [deleteDiscountMutation] = useDeleteDiscountMutation();

  const {active, popup} = useSelector(
    (state: RootStateProps) => ({
      active:
        state.orderDiscount.deleteDiscountPopup?.id ===
        state.menuOrder.discount?.id,
      popup: state.orderDiscount.deleteDiscountPopup,
    }),
    shallowEqual,
  );

  const onClose = () => {
    dispatch(setDeleteDiscountPopup(undefined));
    setTimeout(() => {
      dispatch(setOrderDiscountPopup(true));
    }, 300);
  };

  return (
    <Popup height={270} visible={!!popup} width={540}>
      <Popup.Header title={t('Confirm')} onClose={onClose} />
      <Popup.Body>
        <View style={styles.body}>
          <Text textStyle="labelXLarge">
            {t('Are you sure you want to delete this Discount?', {
              name: popup?.name,
            })}
          </Text>
        </View>
      </Popup.Body>
      <Popup.Footer style={styles.footer}>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="secondary"
          onPress={onClose}>
          {t('Cancel')}
        </Button>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="warning"
          onPress={() => {
            onClose();
            if (popup?.id) {
              if (active) {
                dispatch(setOrderDiscount(undefined));
              }
              deleteDiscountMutation(popup.id);
            }
          }}>
          {t('Delete')}
        </Button>
      </Popup.Footer>
    </Popup>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: vs(24),
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    justifyContent: 'space-between',
  },
});

export default DeleteProductDiscountPopup;
