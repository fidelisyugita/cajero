import React, {useEffect} from 'react';
// import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

// import {yupResolver} from '@hookform/resolvers/yup';
import {IcArrowDown, IcArrowUp, IcInfo, IcUpload} from '../../assets/svgs';
import Box from '../../components/Box';
import Button from '../../components/Button';
import ConditionalRender from '../../components/ConditionalRender';
import Dropdown from '../../components/Dropdown.2';
import InputField2 from '../../components/InputField.2';
import Spacer from '../../components/Spacer';
import Text from '../../components/Text';
import Toggle from '../../components/Toggle';
import {cleanTmp} from '../../helpers/imagePickerHelper';
import {RootStateProps} from '../../store';
import {
  resetProductCreate,
  setAssignCategoryPopupVisible,
  setProductCreatePopup,
} from '../../store/productCreateStore';
import {colors, globalStyles} from '../../styles';
import {s, vs} from '../../utils/scale';
// import schema from './AddProductScreen.schema';
import ProductImage from './components/AddProductImage';
import AssignCategoryPopup from './components/AssignCategoryPopup';
import DeleteCategoryPopup from './components/DeleteCategoryPopup';
import UploadProductImagePopup from './components/UploadProductImagePopup';

const commisionType = [
  {label: 'Percent', value: 'percent'},
  {label: 'Amount', value: 'amount'},
];

type FormAddProduct = {
  image?: {
    value: string;
    type: 'color' | 'image';
  };
  productName: string;
  productCode?: string;
  category?: string;
  commission?: string;
  commissionType?: string;
  price: string;
  tax?: string;
  variant?: any;
};

function AddProductScreen(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {category, image} = useSelector(
    (state: RootStateProps) => ({
      category: state.productCreate.category,
      image: state.productCreate.image,
    }),
    shallowEqual,
  );

  // const {control, handleSubmit, setFocus} = useForm<FormAddProduct>({
  //   defaultValues: {
  //     category: '',
  //     commission: '',
  //     commissionType: 'percent',
  //     image: undefined,
  //     price: '',
  //     productCode: undefined,
  //     productName: '',
  //     tax: '',
  //     variant: undefined,
  //   },
  //   reValidateMode: 'onChange',
  //   resolver: yupResolver(schema),
  // });

  const iconArrow = (visible: boolean | undefined) => {
    const Icon = visible ? IcArrowUp : IcArrowDown;
    return <Icon color={colors.neutral.c600} height={s(20)} width={s(20)} />;
  };

  useEffect(() => {
    return () => {
      dispatch(resetProductCreate());
      cleanTmp();
    };
  }, []);

  return (
    <View style={globalStyles.screen}>
      <UploadProductImagePopup />
      <AssignCategoryPopup />
      <DeleteCategoryPopup />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.column}>
          <Box>
            <Box.Header required title={t('Product Picture')} />
            <Box.Body style={globalStyles.alignCenter}>
              <ProductImage image={image} />
              <Spacer height={16} />
              <View
                style={[
                  globalStyles.rowBetween,
                  globalStyles.selfStretch,
                  styles.uploadFrame,
                ]}>
                <Text color="neutral.c600" textStyle="labelMedium">
                  {t('Upload image\nor Select from Color Options')}
                </Text>
                <Button
                  size="medium"
                  variant="soft"
                  left={
                    <IcUpload
                      color={colors.primary.c400}
                      height={s(20)}
                      width={s(20)}
                    />
                  }
                  onPress={() => dispatch(setProductCreatePopup(true))}>
                  {t('Upload')}
                </Button>
              </View>
            </Box.Body>
          </Box>

          <Box>
            <Box.Header title={t('Category')} />
            <Box.Body>
              <ConditionalRender condition={!!category?.id}>
                <Text color="primary.c400" textStyle="bodyTextXLarge">
                  {category?.name}
                </Text>
                <Spacer height={20} />
              </ConditionalRender>
              <Button
                size="large"
                variant="soft"
                onPress={() => dispatch(setAssignCategoryPopupVisible(true))}>
                {t(category?.id ? 'Change Category' : 'Assign Category')}
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
                  width={vs(158)}
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
    width: vs(473),
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
  uploadFrame: {
    paddingHorizontal: vs(11.5),
  },
  variantFrame: {
    gap: s(20),
  },
});

export default AddProductScreen;
