import React, {Dispatch, memo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {IcDeleteLeft} from '../assets/svgs';
import {colors, globalStyles} from '../styles';
import {s, vs} from '../utils/scale';
import Text from './Text';

type CalculatorProps = {
  setValue: Dispatch<string>;
};

const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'X'];

function Item({
  onPress,
  value,
}: {
  value: string;
  onPress: (val: string) => void;
}): JSX.Element {
  return (
    <TouchableRipple onPress={() => onPress(value)}>
      <View style={styles.itemContainer}>
        {value === 'C' ? (
          <Text color="warning.c400" textStyle="heading2">
            {value}
          </Text>
        ) : value === 'X' ? (
          <IcDeleteLeft
            color={colors.error.c400}
            height={s(48)}
            width={s(48)}
          />
        ) : (
          <Text color="neutral.c600" textStyle="heading2">
            {value}
          </Text>
        )}
      </View>
    </TouchableRipple>
  );
}

function Calculator({setValue}: CalculatorProps): JSX.Element {
  // const [value, setValue] = useState<string>('0');

  const onPress = (val: string) => {
    setValue(prevValue => {
      if (prevValue === '0' && (val === 'C' || val === 'X')) {
        return prevValue;
      }

      if (val === 'C') {
        return '0';
      }

      if (val === 'X') {
        return prevValue.slice(0, -1);
      }

      return prevValue === '0' ? val : prevValue + val;
    });
  };

  return (
    <FlatList
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.content}
      data={list}
      keyExtractor={item => String(item)}
      numColumns={3}
      renderItem={({item}) => <MItem value={item} onPress={onPress} />}
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={globalStyles.horizontalLine} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-between',
  },
  content: {
    borderColor: colors.neutral.c300,
    borderRadius: s(8),
    borderWidth: 1,
    overflow: 'hidden',
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: colors.neutral.c200,
    borderRightColor: colors.neutral.c300,
    borderRightWidth: 1,
    height: s(112.5),
    justifyContent: 'center',
    width: vs(734 / 3),
  },
});

const MItem = memo(Item);

export default memo(Calculator);
