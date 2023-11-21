import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import Button from '../../../components/Button';
import {vs} from '../../../utils/scale';

function EditProductHeaderRight(): JSX.Element {
  const {t} = useTranslation();
  return (
    <Button containerStyle={styles.button} size="medium">
      {t('Save')}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: vs(188),
  },
});

export default EditProductHeaderRight;
