import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import ShortUniqueId from 'short-unique-id';

import {createSelector} from '@reduxjs/toolkit';
import {FlashList} from '@shopify/flash-list';

import {
  IcArrowCircleRight,
  IcArrowDown,
  IcArrowUp,
  IcCart,
  IcMinus,
  IcPlus,
} from '../../../assets/svgs';
import Button from '../../../components/Button';
import ButtonIcon from '../../../components/ButtonIcon';
import ConditionalRender from '../../../components/ConditionalRender';
import Dropdown from '../../../components/Dropdown.2';
import Image from '../../../components/Image';
import InputField2 from '../../../components/InputField.2';
import Popup from '../../../components/Popup';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {isValidNumber} from '../../../helpers/commonHelper';
import {RootStateProps, store} from '../../../store';
import {
  addQtyProduct,
  chooseProduct,
  setProductDiscount,
  setProductNotes,
  subtractQtyProduct,
} from '../../../store/menuChooseStore';
import {
  addProductToOrderList,
  editProductInOrderList,
} from '../../../store/menuOrderStore';
import {colors, globalStyles} from '../../../styles';
import {currencyPrice} from '../../../utils/convert';
import {getFinalPriceItem} from '../../../utils/price';
import {s, vs} from '../../../utils/scale';
import MenuOptionCard from './MenuOptionCard';

type Variant = {
  id: string;
  name: string;
  price: number;
  type: 'single' | 'multiple';
  parent: string;
};

const discountType = [
  {label: 'Percent', value: 'percent'},
  {label: 'Amount', value: 'amount'},
];

function separator() {
  return <Spacer height={8} />;
}

function AdjustQuantity(): JSX.Element {
  const dispatch = useDispatch();
  const qty = useSelector(
    (state: RootStateProps) => state.menuChoose.product?.qty || 0,
  );

  return (
    <View style={styles.adjustQtyWrapper}>
      <ButtonIcon
        IconComponent={IcMinus}
        disabled={qty === 1}
        size="medium"
        variant="neutral"
        onPress={() => {
          dispatch(subtractQtyProduct());
        }}
      />
      <View style={styles.qty}>
        <Text textStyle="labelLarge">{qty}</Text>
        <View style={styles.qtyLine} />
      </View>
      <ButtonIcon
        IconComponent={IcPlus}
        size="medium"
        variant="neutral"
        onPress={() => {
          dispatch(addQtyProduct());
        }}
      />
    </View>
  );
}

const selectVariants = (state: RootStateProps) =>
  state.menuChoose.product?.variants;

const selectVariantsTransform = createSelector([selectVariants], variants => {
  const result: (string | Variant)[] = [];

  if (variants) {
    Object.keys(variants).forEach(variantKey => {
      const variant = variants[variantKey];
      result.push(`${variant.name}${variant.required ? ' *' : ''}`);

      const variantType: 'single' | 'multiple' = variant.type as
        | 'single'
        | 'multiple';

      Object.keys(variant.items).forEach(itemKey => {
        const item = variant.items[itemKey];
        result.push({
          ...item,
          id: itemKey,
          parent: variantKey,
          type: variantType,
        });
      });
    });
  }

  return result;
});

function ListHeaderComponent(): JSX.Element {
  const {t} = useTranslation();
  const {name, price} = useSelector(
    (state: RootStateProps) => ({
      name: state.menuChoose.product?.name,
      price: state.menuChoose.product?.price || 0,
    }),
    shallowEqual,
  );

  return (
    <>
      <Text textStyle="heading3">{name}</Text>
      <Spacer height={8} />
      <View style={globalStyles.rowBetween}>
        <Text color="neutral.c600" textStyle="bodyTextLarge">
          {t('Basic Price')}
        </Text>
        <Text color="primary.c400" textStyle="heading3">
          {currencyPrice(price)}
        </Text>
      </View>
      <Spacer height={16} />
      <Text color="neutral.c500" textStyle="labelSmall">
        {t('Variant')}
      </Text>
      <Spacer height={12} />
    </>
  );
}

function ListFooterComponent(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {type, value} = useSelector(
    (state: RootStateProps) => state.menuChoose.product?.discount || {},
    shallowEqual,
  );

  const iconArrow = (visible: boolean | undefined) => {
    const Icon = visible ? IcArrowUp : IcArrowDown;
    return <Icon color={colors.neutral.c600} height={s(20)} width={s(20)} />;
  };

  return (
    <>
      <View style={styles.discountWrapper}>
        <InputField2
          containerStyle={styles.discountField}
          keyboardType="number-pad"
          maxLength={type === 'amount' ? 10 : 3}
          placeholder={t('Discount')}
          size="small"
          value={value}
          onChangeText={val =>
            isValidNumber(val)
              ? dispatch(setProductDiscount({value: val}))
              : null
          }
        />
        <Dropdown
          data={discountType}
          placeholder="Percent"
          renderRightIcon={iconArrow}
          size="small"
          width={vs(112)}
          onChange={item => {
            dispatch(setProductDiscount({type: item.value, value: ''}));
          }}
        />
      </View>
      <InputField2
        placeholder={t('Note (Optional)')}
        size="small"
        onChangeText={val => dispatch(setProductNotes(val))}
      />
    </>
  );
}

function List(): JSX.Element {
  const variants = useSelector(selectVariantsTransform);

  return (
    <FlashList
      ItemSeparatorComponent={separator}
      ListFooterComponent={MListFooterComponent}
      ListHeaderComponent={MListHeaderComponent}
      contentContainerStyle={styles.rightSide}
      data={variants}
      estimatedItemSize={s(40)}
      getItemType={item => (typeof item === 'string' ? 'sectionHeader' : 'row')}
      renderItem={({index, item}) => {
        if (typeof item === 'string') {
          return (
            <>
              <ConditionalRender condition={index !== 0}>
                <Spacer height={4} />
              </ConditionalRender>
              <Text textStyle="heading5">{item}</Text>
            </>
          );
        } else {
          return <MenuOptionCard active={false} item={item} />;
        }
      }}
    />
  );
}

function PopupFooter(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {disabled, isEdit} = useSelector((state: RootStateProps) => {
    const variants = state.menuChoose.product?.variants;

    if (!variants) {
      return {
        disabled: false,
        isEdit: !!state.menuChoose.product?.productOrderId,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const disabled = Object.values(variants).some(variant => {
      return (
        variant.required && (!variant.selected || variant.selected.length < 1)
      );
    });

    return {
      disabled,
      isEdit: !!state.menuChoose.product?.productOrderId,
    };
  }, shallowEqual);

  const addToOrderList = () => {
    const uid = new ShortUniqueId();
    const product = store.getState()?.menuChoose?.product;

    if (product) {
      const productOrderId = uid.rnd();
      const finalProduct = {
        ...product,
        discount: product.discount?.value
          ? {...product.discount, type: 'percent'}
          : undefined,
        productOrderId,
      };

      dispatch(
        addProductToOrderList({
          ...finalProduct,
          totalPrice: getFinalPriceItem(finalProduct),
        }),
      );

      dispatch(chooseProduct(undefined));
    }
  };

  const editOrderList = () => {
    const product = store.getState()?.menuChoose?.product;

    dispatch(
      editProductInOrderList({
        ...product,
        discount: product.discount?.value
          ? {...product.discount, type: 'percent'}
          : undefined,
        totalPrice: getFinalPriceItem(product),
      }),
    );
    dispatch(chooseProduct(undefined));
  };

  const Icon = !isEdit ? IcCart : IcArrowCircleRight;

  return (
    <Popup.Footer>
      <Button
        disabled={disabled}
        left={<Icon color={colors.neutral.c100} height={s(24)} width={s(24)} />}
        size="large"
        onPress={!isEdit ? addToOrderList : editOrderList}>
        {t(!isEdit ? 'Add to Order List' : 'Save')}
      </Button>
    </Popup.Footer>
  );
}

function PopupBody(): JSX.Element {
  const thumbnail = useSelector(
    (state: RootStateProps) => state.menuChoose.product?.thumbnail,
    shallowEqual,
  );
  return (
    <Popup.Body>
      <View style={styles.body}>
        <View style={styles.leftSide}>
          <Image
            withSkeleton
            height={s(171)}
            radius={s(4)}
            source={{uri: thumbnail}}
            width={vs(314)}
          />
          <AdjustQuantity />
        </View>
        <MList />
      </View>
    </Popup.Body>
  );
}

function MenuAddProductPopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {isEdit, visible} = useSelector(
    (state: RootStateProps) => ({
      isEdit: !!state.menuChoose.product?.productOrderId,
      visible: !!state.menuChoose.product?.id,
    }),
    shallowEqual,
  );

  return (
    <Popup height={674} visible={visible} width={697}>
      <Popup.Header
        title={t(!isEdit ? 'Add Item' : 'Edit Item')}
        onClose={() => dispatch(chooseProduct(undefined))}
      />

      <PopupBody />
      <PopupFooter />
    </Popup>
  );
}

const MListHeaderComponent = memo(ListHeaderComponent);
const MListFooterComponent = memo(ListFooterComponent);
const MList = memo(List);

const styles = StyleSheet.create({
  adjustQtyWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(12),
    marginTop: s(20),
  },
  body: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountField: {
    width: vs(191),
  },
  discountWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(12),
    justifyContent: 'space-between',
    paddingVertical: s(16),
  },
  leftSide: {
    flex: 1,
    paddingLeft: vs(24),
  },
  qty: {
    alignItems: 'center',
  },
  qtyLine: {
    ...globalStyles.horizontalLine,
    backgroundColor: colors.neutral.c400,
    marginTop: s(4),
    width: vs(48),
  },
  rightSide: {
    paddingBottom: s(200),
    paddingRight: vs(24),
  },
});

export default memo(MenuAddProductPopup);
