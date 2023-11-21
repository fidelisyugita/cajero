import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import Button from '../../../components/Button';
import {globalStyles} from '../../../styles';
import {vs} from '../../../utils/scale';

function AddProductHeaderRight(): JSX.Element {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Button containerStyle={styles.button} size="medium" variant="secondary">
        {t('Save & Add More')}
      </Button>
      <Button containerStyle={styles.button} size="medium">
        {t('Save')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: vs(188),
  },
  container: {
    ...globalStyles.rowHCenter,
    gap: vs(16),
  },
});

export default AddProductHeaderRight;
