import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {IcArrowDown, IcArrowUp, IcInfo} from '../../assets/svgs';
import Box from '../../components/Box';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown.2';
import InputField2 from '../../components/InputField.2';
import Text from '../../components/Text';
import Toggle from '../../components/Toggle';
import {setProductCreatePopup} from '../../store/productCreateStore';
import {colors, globalStyles} from '../../styles';
import {s, vs} from '../../utils/scale';
import ProductImage from './components/AddProductImage';
import UploadProductImagePopup from './components/UploadProductImagePopup';

const commisionType = [
  {label: 'Percent', value: 'percent'},
  {label: 'Amount', value: 'amount'},
];

function AddProductScreen(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const iconArrow = (visible: boolean | undefined) => {
    const Icon = visible ? IcArrowUp : IcArrowDown;
    return <Icon color={colors.neutral.c600} height={s(20)} width={s(20)} />;
  };

  return (
    <View style={globalStyles.screen}>
      <UploadProductImagePopup />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.column}>
          <Box>
            <Box.Header required title={t('Product Picture')} />
            <Box.Body style={globalStyles.alignCenter}>
              <TouchableRipple
                onPress={() => dispatch(setProductCreatePopup(true))}>
                <ProductImage>
                  <Text
                    color="neutral.c600"
                    style={globalStyles.textCenter}
                    textStyle="labelMedium">
                    {t('Upload image\nor Select from Color Options')}
                  </Text>
                </ProductImage>
              </TouchableRipple>
            </Box.Body>
          </Box>

          <Box>
            <Box.Header title={t('Category')} />
            <Box.Body>
              <Button size="large" variant="soft">
                {t('Assign Category')}
              </Button>
            </Box.Body>
          </Box>

          <View style={styles.stockFrame}>
            <View style={globalStyles.flex}>
              <Text textStyle="heading4">
                {t('Does this menu require stock management?')}
              </Text>
              <View style={styles.stockDescriptionFrame}>
                <IcInfo
                  color={colors.neutral.c600}
                  height={s(20)}
                  width={s(20)}
                />
                <Text
                  color="neutral.c600"
                  style={globalStyles.shrink}
                  textStyle="labelMedium">
                  {t(
                    'When enabled, stock management is required before adding the menu item to orders. If the stock reaches 0, the menu item cannot be ordered.',
                  )}
                </Text>
              </View>
            </View>
            <View>
              <Toggle onPress={() => {}} />
            </View>
          </View>
        </View>
        <View style={styles.column}>
          <Box>
            <Box.Header required title={t('Product Information')} />
            <Box.Body style={styles.productInformationFrame}>
              <InputField2
                label={`${t('Prouduct Name')} *`}
                placeholder={`${t('Prouduct Name')} *`}
                size="large"
              />
              <InputField2
                label={`${t('Price')} *`}
                placeholder={`${t('Price')} *`}
                size="large"
              />
              <View style={styles.commisionFormFrame}>
                <InputField2
                  containerStyle={styles.commissionForm}
                  keyboardType="number-pad"
                  maxLength={20}
                  placeholder={t('Commission')}
                  size="large"
                />
                <Dropdown
                  data={commisionType}
                  placeholder="Percent"
                  renderRightIcon={iconArrow}
                  size="large"
                  width={vs(161)}
                  onChange={() => {}}
                />
              </View>

              <InputField2
                label={t('Prouduct Code (Optional)')}
                placeholder={t('Prouduct Code (Optional)')}
                size="large"
              />

              <InputField2
                label={t('Tax (Optional)')}
                placeholder={t('Tax (Optional)')}
                size="large"
              />
            </Box.Body>
          </Box>

          <Box>
            <Box.Header title={t('Variant (Optional)')} />
            <Box.Body style={styles.variantFrame}>
              <Button size="large" variant="soft">
                {t('Add New Variant')}
              </Button>
              <Button size="large" variant="soft">
                {t('Choose from Existing Variants')}
              </Button>
            </Box.Body>
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    gap: s(32),
    width: vs(474),
  },
  commisionFormFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(20),
  },
  commissionForm: {
    width: vs(248),
  },
  content: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: vs(32),
    justifyContent: 'center',
    paddingVertical: s(32),
  },
  imagePlaceholderFrame: {
    alignItems: 'center',
    backgroundColor: colors.neutral.c300,
    borderColor: colors.neutral.c400,
    borderRadius: s(4),
    borderWidth: 1,
    gap: s(3),
    height: s(220),
    justifyContent: 'center',
    width: vs(403),
  },
  productInformationFrame: {
    gap: s(20),
  },
  stockDescriptionFrame: {
    flexDirection: 'row',
    flexShrink: 1,
    gap: vs(8),
    marginTop: s(12),
  },
  stockFrame: {
    flexDirection: 'row',
    gap: vs(12),
  },
  variantFrame: {
    gap: s(20),
  },
});

export default AddProductScreen;