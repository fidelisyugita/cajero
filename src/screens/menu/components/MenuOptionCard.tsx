import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {
  IcCheckbox,
  IcCheckboxOutline,
  IcRadio,
  IcRadioOutline,
} from '../../../assets/svgs';
import Text from '../../../components/Text';
import {RootStateProps} from '../../../store';
import {
  setProductVariantMultiple,
  setProductVariantSingle,
} from '../../../store/menuChooseStore';
import {colors, globalStyles} from '../../../styles';
import {currencyPrice} from '../../../utils/convert';
import {s, vs} from '../../../utils/scale';

type Variant = {
  id: string;
  name: string;
  price: number;
  type: 'single' | 'multiple';
  parent: string;
};

type OptionCardProps = {
  item: Variant;
  active?: boolean;
};

function getIconOption(type: Variant['type'], active: boolean = false) {
  let icon = [IcCheckboxOutline, IcCheckbox];
  if (type === 'single') {
    icon = [IcRadioOutline, IcRadio];
  }

  return icon[active ? 1 : 0];
}

function MenuOptionCard({item}: OptionCardProps): JSX.Element {
  const {id, name, parent, price, type} = item;
  const dispatch = useDispatch();

  const {active, disabled} = useSelector((state: RootStateProps) => {
    const variants = state.menuChoose.product?.variants[parent];
    const selected = variants?.selected || [];
    const max = variants?.max || 0;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const active = selected.includes(id);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const disabled = selected.length >= max && !active && type === 'multiple';

    return {active, disabled};
  }, shallowEqual);

  const Icon = getIconOption(type, active);

  return (
    <TouchableRipple
      disabled={disabled}
      onPress={() => {
        dispatch(
          type === 'multiple'
            ? setProductVariantMultiple({[parent]: id})
            : setProductVariantSingle({[parent]: id}),
        );
      }}>
      <View style={styles.container}>
        <Icon
          color={active ? colors.primary.c400 : colors.neutral.c400}
          height={s(24)}
          width={s(24)}
        />
        <View style={[globalStyles.rowHBetween, globalStyles.flex]}>
          <Text textStyle="labelMedium">{name}</Text>
          <Text color="primary.c400" textStyle="labelMedium">
            {currencyPrice(price)}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(14),
    paddingVertical: s(8),
  },
});

export default memo(MenuOptionCard);
