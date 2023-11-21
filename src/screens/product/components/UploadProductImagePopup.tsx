import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {IcUpload} from '../../../assets/svgs';
import Button from '../../../components/Button';
import Popup from '../../../components/Popup';
import Text from '../../../components/Text';
import {openPicker} from '../../../helpers/imagePickerHelper';
import {RootStateProps} from '../../../store';
import {
  setProductCreatePopup,
  setProductImage,
} from '../../../store/productCreateStore';
import {colors, globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';
import ProductImage from './AddProductImage';

const colorOptions = [
  colors.primary.c100,
  colors.primary.c200,
  colors.primary.c300,
  colors.pressed.c5,
  colors.pressed.c2,
  colors.pressed.c3,
];

function UploadProductImagePopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: RootStateProps) => state.productCreate.popupVisible,
  );

  return (
    <Popup height={566} visible={visible} width={451}>
      <Popup.Header
        title={t('Product Picture')}
        onClose={() => dispatch(setProductCreatePopup(false))}
      />
      <Popup.Body style={styles.body}>
        <ProductImage />

        <View style={styles.item}>
          <Text color="neutral.c600" textStyle="labelLarge">
            {t('Upload Image')}
          </Text>
          <Button
            containerStyle={globalStyles.selfStart}
            size="medium"
            variant="soft"
            left={
              <IcUpload
                color={colors.primary.c400}
                height={s(20)}
                width={s(20)}
              />
            }
            onPress={() => {
              openPicker((value: string) =>
                dispatch(setProductImage({type: 'image', value})),
              );
            }}>
            {t('Choose File')}
          </Button>
        </View>
        <View style={styles.item}>
          <Text color="neutral.c600" textStyle="labelLarge">
            {t('Choose Color')}
          </Text>
          <FlatList
            horizontal
            contentContainerStyle={styles.colorContent}
            data={colorOptions}
            keyExtractor={item => item}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <TouchableRipple
                  onPress={() =>
                    dispatch(setProductImage({type: 'color', value: item}))
                  }>
                  <View style={[styles.boxColor, {backgroundColor: item}]} />
                </TouchableRipple>
              );
            }}
          />
        </View>
      </Popup.Body>
    </Popup>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: s(24),
    paddingHorizontal: vs(24),
  },
  boxColor: {
    borderRadius: s(4),
    height: s(60),
    width: s(60),
  },
  colorContent: {
    gap: vs(8),
    justifyContent: 'space-between',
  },

  item: {
    gap: s(12),
  },
});

export default UploadProductImagePopup;
