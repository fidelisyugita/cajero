import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../../components/Button';
import Popup from '../../../components/Popup';
import Text from '../../../components/Text';
import {RootStateProps} from '../../../store';
import {
  removeAllProductFromOrderList,
  setRemoveAllOrderListPopup,
} from '../../../store/menuOrderStore';
import {globalStyles} from '../../../styles';
import {vs} from '../../../utils/scale';

function RemoveAllOrderListPopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const visible = useSelector(
    (state: RootStateProps) => state.menuOrder.removeAllOrderListPopup,
  );

  const onClose = () => dispatch(setRemoveAllOrderListPopup(false));

  return (
    <Popup height={270} visible={visible} width={540}>
      <Popup.Header title={t('Confirm')} onClose={onClose} />
      <Popup.Body>
        <View style={styles.body}>
          <Text textStyle="labelXLarge">
            {t(
              'Are you sure you want to remove all products from the order list?',
            )}
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
            dispatch(removeAllProductFromOrderList());
            onClose();
          }}>
          {t('Confirm')}
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

export default RemoveAllOrderListPopup;
