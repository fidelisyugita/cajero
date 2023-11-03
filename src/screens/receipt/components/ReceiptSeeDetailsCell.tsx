import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Button from '../../../components/Button';
import {s} from '../../../utils/scale';
import {ReceiptProps} from '../Receipt.type';

type ReceiptSeeDetailsCellProps = {
  data: ReceiptProps;
};

function ReceiptSeeDetailsCell({
  data,
}: ReceiptSeeDetailsCellProps): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        size="small"
        variant="neutral"
        onPress={() => {
          navigation.navigate('ReceiptDetailsScreen', {id: data.id});
        }}>
        {t('See Details')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: s(80),
    justifyContent: 'center',
  },
});

export default ReceiptSeeDetailsCell;
