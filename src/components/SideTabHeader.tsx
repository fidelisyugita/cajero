import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

import {s, vs} from '../utils/scale';
import Image from './Image';
import Spacer from './Spacer';
import Text from './Text';

type SideTabHeaderProps = {
  left?: ReactNode;
};

function SideTabHeader({left}: SideTabHeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      {left}
      <View style={styles.profileWrapper}>
        <Image
          withSkeleton
          borderRadius={s(100)}
          height={s(40)}
          radius={s(100)}
          source={{uri: 'https://i.pravatar.cc/300'}}
          width={s(40)}
        />
        <View>
          <Text textStyle="labelLarge">Arman Maulana</Text>
          <Spacer height={4} />
          <Text color="neutral.c600" textStyle="bodyTextSmall">
            Owner
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: vs(22),
    paddingRight: vs(24),
  },
  profileWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(8),
  },
});

export default SideTabHeader;
