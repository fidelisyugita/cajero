import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import {IcMagnify} from '../../../assets/svgs';
import InputField2 from '../../../components/InputField.2';
import SideTabHeader from '../../../components/SideTabHeader';
import {colors} from '../../../styles';
import {s, vs} from '../../../utils/scale';

function MenuHeader() {
  const {t} = useTranslation();

  return (
    <SideTabHeader
      left={
        <InputField2
          containerStyle={styles.searchInput}
          placeholder={t('Search category or menu')}
          size="medium"
          right={
            <IcMagnify
              color={colors.neutral.c600}
              height={s(24)}
              width={s(24)}
            />
          }
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    width: vs(400),
  },
});

export default MenuHeader;
