import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import ShortUniqueId from 'short-unique-id';

import {FlashList} from '@shopify/flash-list';

import {
  IcArrowDown,
  IcArrowUp,
  IcEmpty,
  IcPlus,
  IcRadio,
  IcRadioOutline,
  IcX,
} from '../../../assets/svgs';
import Button from '../../../components/Button';
import ButtonIcon from '../../../components/ButtonIcon';
import ConditionalRender from '../../../components/ConditionalRender';
import Dropdown from '../../../components/Dropdown.2';
import EmptyList from '../../../components/EmptyList';
import InputField2 from '../../../components/InputField.2';
import Popup from '../../../components/Popup';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {DiscountProps} from '../../../interfaces/CommonInterface';
import {
  useAddDiscountMutation,
  useGetDiscountsQuery,
} from '../../../services/discountApi';
import {RootStateProps} from '../../../store';
import {setOrderDiscount} from '../../../store/menuOrderStore';
import {
  setDeleteDiscountPopup,
  setOrderDiscountPopup,
  setSelectedDiscount,
} from '../../../store/orderDiscountStore';
import {colors, globalStyles} from '../../../styles';
import {currencyPrice} from '../../../utils/convert';
import {s, vs} from '../../../utils/scale';

const discountType = [
  {label: 'Percent', value: 'percent'},
  {label: 'Amount', value: 'amount'},
];

const uid = new ShortUniqueId();

function MenuProductDiscountPopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {discount, popupVisible, selectedDiscount} = useSelector(
    (state: RootStateProps) => ({
      discount: state.menuOrder.discount,
      popupVisible: state.orderDiscount.popupVisible,
      selectedDiscount: state.orderDiscount.selectedDiscount,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (popupVisible) {
      dispatch(setSelectedDiscount(discount));
    }
  }, [popupVisible]);

  return (
    <Popup height={862} visible={popupVisible} width={672}>
      <Popup.Header
        title={t('Discount')}
        onClose={() => dispatch(setOrderDiscountPopup(false))}
      />

      <Popup.Body>
        <CreateDiscount />
        <Spacer height={32} />
        <MDiscountList />
      </Popup.Body>

      <Popup.Footer style={styles.footer}>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="secondary"
          onPress={() => dispatch(setOrderDiscountPopup(false))}>
          {t('Cancel')}
        </Button>
        <Button
          containerStyle={globalStyles.flex}
          size="medium"
          variant="primary"
          onPress={() => {
            dispatch(setOrderDiscount(selectedDiscount));
            dispatch(setOrderDiscountPopup(false));
          }}>
          {t('Save')}
        </Button>
      </Popup.Footer>
    </Popup>
  );
}

function CreateDiscount(): JSX.Element {
  const {t} = useTranslation();
  const [addDiscountMutation] = useAddDiscountMutation();

  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<string>('percent');

  const iconArrow = (visible: boolean | undefined) => {
    const Icon = visible ? IcArrowUp : IcArrowDown;
    return <Icon color={colors.neutral.c600} height={s(20)} width={s(20)} />;
  };

  const addDiscount = () => {
    addDiscountMutation({
      id: uid.rnd(),
      name,
      type,
      value,
      valueDisplay:
        type === 'amount' ? currencyPrice(Number(value)) : `${value}%`,
    });

    setName('');
    setValue('');
    setType('percent');
  };

  return (
    <View style={styles.createFrame}>
      <Text textStyle="heading4">{t('Create New Discount')}</Text>
      <Spacer height={20} />
      <InputField2
        placeholder={t('Discount Name')}
        size="large"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.discountValueFrame}>
        <InputField2
          containerStyle={styles.discountField}
          keyboardType="number-pad"
          maxLength={type === 'amount' ? 10 : 3}
          placeholder={t('Value')}
          size="large"
          value={value}
          onChangeText={val => {
            if (type === 'percent') {
              setValue(Number(val) > 100 ? '100' : val);
            } else {
              setValue(val);
            }
          }}
        />
        <Dropdown
          data={discountType}
          placeholder="Percent"
          renderRightIcon={iconArrow}
          size="large"
          width={vs(158)}
          onChange={item => setType(item.value)}
        />
      </View>

      <Button
        containerStyle={styles.btnAdd}
        disabled={!name || !value}
        size="medium"
        left={
          <IcPlus color={colors.neutral.c100} height={s(20)} width={s(20)} />
        }
        onPress={addDiscount}>
        {t('Add Discount')}
      </Button>
    </View>
  );
}

function DiscountList(): JSX.Element {
  const {t} = useTranslation();

  const {data} = useGetDiscountsQuery(undefined, {});

  return (
    <View style={styles.discountListWrapper}>
      <FlashList
        ItemSeparatorComponent={() => <Spacer height={8} />}
        contentContainerStyle={styles.discountList}
        data={data}
        estimatedItemSize={s(52)}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MDiscountCard item={item} />}
        ListEmptyComponent={
          <EmptyList
            Icon={IcEmpty}
            subtitle={t('Kick Things Off with Your First Discount.')}
            title={t('Discounts are the Spice of Sales!')}
          />
        }
        ListHeaderComponent={
          <>
            <Text textStyle="heading4">{t('List of Discounts')}</Text>
            <Spacer height={20} />
            <MDiscountCard item={{id: undefined, name: t('None')}} />
            <Spacer height={8} />
          </>
        }
      />
    </View>
  );
}

function DiscountCard({item}: {item: DiscountProps}): JSX.Element {
  const {id, name, value, valueDisplay} = item;
  const active = useSelector(
    (state: RootStateProps) => state.orderDiscount.selectedDiscount?.id === id,
  );

  const Icon = active ? IcRadio : IcRadioOutline;
  const dispatch = useDispatch();

  return (
    <TouchableRipple onPress={() => dispatch(setSelectedDiscount(item))}>
      <View style={styles.discountFrame}>
        <View style={styles.discountLeftFrame}>
          <Icon
            color={active ? colors.primary.c400 : colors.neutral.c400}
            height={s(24)}
            width={s(24)}
          />
          <Text textStyle="bodyTextLarge">{name}</Text>
        </View>
        <ConditionalRender condition={value !== undefined}>
          <View style={styles.discountRightFrame}>
            <Text color="success.c400" textStyle="labelLarge">
              {valueDisplay}
            </Text>
            <ButtonIcon
              transparent
              IconComponent={IcX}
              size="medium"
              variant="neutralNoStroke"
              onPress={() => {
                dispatch(setOrderDiscountPopup(false));
                setTimeout(() => {
                  dispatch(setDeleteDiscountPopup({id, name}));
                }, 300);
              }}
            />
          </View>
        </ConditionalRender>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  btnAdd: {
    alignSelf: 'flex-end',
  },
  createFrame: {
    paddingHorizontal: vs(24),
  },
  discountField: {
    width: vs(450),
  },
  discountFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    height: s(52),
    justifyContent: 'space-between',
    paddingVertical: s(4),
  },
  discountLeftFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
  },
  discountList: {
    paddingBottom: s(24),
    paddingHorizontal: vs(24),
  },
  discountListWrapper: {
    height: s(388),
  },
  discountRightFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(20),
  },
  discountValueFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    marginVertical: s(16),
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    justifyContent: 'space-between',
  },
});

const MDiscountList = memo(DiscountList);

const MDiscountCard = memo(DiscountCard);

export default MenuProductDiscountPopup;
