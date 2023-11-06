import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import {
  IcArrowDown,
  IcArrowUp,
  IcCalendar,
  IcFilter,
  IcMagnify,
} from '../../../assets/svgs';
import ButtonInput from '../../../components/ButtonInput';
import Dropdown from '../../../components/Dropdown.2';
import InputField2 from '../../../components/InputField.2';
import SideTabHeader from '../../../components/SideTabHeader';
import {colors} from '../../../styles';
import i18n from '../../../translations';
import {s, vs} from '../../../utils/scale';

const filters = [
  {label: i18n.t('All'), value: 'all'},
  {label: i18n.t('Completed'), value: 'completed'},
  {label: i18n.t('Refund'), value: 'refund'},
];

function ReceiptHeader(): JSX.Element {
  const {t} = useTranslation();

  const iconFilter = (visible: boolean | undefined) => {
    const Icon = visible ? IcArrowUp : IcArrowDown;
    return <Icon color={colors.neutral.c600} height={s(20)} width={s(20)} />;
  };

  return (
    <SideTabHeader
      left={
        <View style={styles.leftWrapper}>
          <InputField2
            containerStyle={styles.searchInput}
            placeholder={t('Search transaction number')}
            size="medium"
            right={
              <IcMagnify
                color={colors.neutral.c600}
                height={s(24)}
                width={s(24)}
              />
            }
          />
          <Dropdown
            data={filters}
            placeholder={t('All')}
            renderRightIcon={iconFilter}
            size="medium"
            width={s(151)}
          />
          <ButtonInput
            label="20/09/2023 - 20/10/2023"
            size="medium"
            right={
              <IcCalendar
                color={colors.neutral.c600}
                height={s(20)}
                width={s(20)}
              />
            }
            onPress={() => {}}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  leftWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(20),
  },
  searchInput: {
    width: vs(400),
  },
});

export default ReceiptHeader;
