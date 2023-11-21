import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

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

type ImageStateProps = {
  type: 'color' | 'image';
  value: string;
};

function UploadProductImagePopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {image, visible} = useSelector(
    (state: RootStateProps) => ({
      image: state.productCreate.image,
      visible: state.productCreate.popupVisible,
    }),
    shallowEqual,
  );

  const [tempImage, setTempImage] = useState<ImageStateProps | undefined>(
    undefined,
  );

  useEffect(() => {
    if (visible) {
      setTempImage(image);
    } else {
      setTempImage(undefined);
    }
  }, [visible]);

  return (
    <Popup height={666} visible={visible} width={451}>
      <Popup.Header
        title={t('Product Picture')}
        onClose={() => dispatch(setProductCreatePopup(false))}
      />
      <Popup.Body style={styles.body}>
        <ProductImage image={tempImage} />

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
                setTempImage({type: 'image', value}),
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
                  onPress={() => setTempImage({type: 'color', value: item})}>
                  <View style={[styles.boxColor, {backgroundColor: item}]} />
                </TouchableRipple>
              );
            }}
          />
        </View>
      </Popup.Body>

      <Popup.Footer style={styles.footer}>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="secondary"
          onPress={() => dispatch(setProductCreatePopup(false))}>
          {t('Cancel')}
        </Button>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="primary"
          onPress={() => {
            dispatch(setProductImage(tempImage));
            dispatch(setProductCreatePopup(false));
          }}>
          {t('Save')}
        </Button>
      </Popup.Footer>
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

  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    justifyContent: 'space-between',
  },
  item: {
    gap: s(12),
  },
});

export default UploadProductImagePopup;
