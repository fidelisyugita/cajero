import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

import {colors} from '../styles';
import {s, vs} from '../utils/scale';
import Text from './Text';

type StatusCardProps = {
  status: 'completed' | 'refund' | string;
};

const color: {
  [key: string]: {
    backgroundColor: string;
    borderColor: string;
    color: string;
  };
} = {
  completed: {
    backgroundColor: colors.positif.c100,
    borderColor: colors.positif.c400,
    color: 'positif.c600',
  },
  refund: {
    backgroundColor: colors.error.c100,
    borderColor: colors.error.c400,
    color: 'error.c600',
  },
};

function StatusCard({status}: StatusCardProps): JSX.Element {
  const {t} = useTranslation();

  const {
    backgroundColor,
    borderColor,
    color: textColor,
  } = color[status?.toLowerCase()];

  return (
    <View style={styles.container}>
      <View style={[styles.outer, {backgroundColor, borderColor}]}>
        <Text color={textColor} textStyle="labelSmall">
          {t(status)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: s(80),
    justifyContent: 'center',
  },
  outer: {
    alignItems: 'center',
    borderRadius: s(4),
    borderWidth: 1,
    height: s(34),
    justifyContent: 'center',
    minWidth: vs(96),
    paddingHorizontal: vs(16),
  },
});

export default memo(StatusCard);
