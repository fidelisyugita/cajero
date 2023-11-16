import React, {ElementType} from 'react';
import {StyleSheet, View} from 'react-native';

import {globalStyles} from '../styles';
import {s} from '../utils/scale';
import Text from './Text';

type EmptyListProps = {
  Icon: ElementType;
  title: string;
  subtitle: string;
};

function EmptyList({Icon, subtitle, title}: EmptyListProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Icon height={s(160)} width={s(160)} />
      <Text style={globalStyles.textCenter} textStyle="heading3">
        {title}
      </Text>
      <Text style={globalStyles.textCenter} textStyle="bodyTextLarge">
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: s(12),
    paddingTop: s(20),
  },
});

export default EmptyList;
