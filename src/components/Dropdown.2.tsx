import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown as DropdownElement} from 'react-native-element-dropdown';
import {TouchableRipple} from 'react-native-paper';

import {colors, globalStyles} from '../styles';
import {fontStyle} from '../styles/fonts';
import {s, vs} from '../utils/scale';
import Text from './Text';

type Size = 'large' | 'medium' | 'small';

interface DropdownProps {
  placeholder?: string;
  size?: Size;
  renderRightIcon?: (visible?: boolean) => JSX.Element | null | undefined;
  data: [];
  width: number;
  onChange: (item: any) => void;
}

function getStyle(size: Size) {
  const style = {
    large: {
      containerStyle: {
        height: s(60),
      },
      labelStyle: {
        color: colors.neutral.c500,
        ...fontStyle.bodyTextXLarge,
      },
    },
    medium: {
      containerStyle: {
        height: s(52),
      },
      labelStyle: {
        color: colors.neutral.c500,
        ...fontStyle.bodyTextLarge,
      },
    },
    small: {
      containerStyle: {
        height: s(44),
      },
      labelStyle: {
        color: colors.neutral.c500,
        ...fontStyle.bodyTextMedium,
      },
    },
  };

  return style[size];
}

function Dropdown({
  size = 'large',
  width,
  ...rest
}: DropdownProps): JSX.Element {
  const {containerStyle, labelStyle} = getStyle(size);

  return (
    <DropdownElement
      TouchElement={TouchableRipple}
      activeColor={colors.neutral.c100}
      containerStyle={styles.list}
      fontFamily={labelStyle.fontFamily}
      labelField="label"
      placeholderStyle={labelStyle}
      selectedTextStyle={labelStyle}
      style={[styles.container, {width}, containerStyle]}
      valueField="value"
      flatListProps={{
        ItemSeparatorComponent: () => <View style={styles.separator} />,
      }}
      renderItem={(item: {label: string; value: string}) => (
        <View style={styles.item}>
          <Text style={labelStyle}>{item.label}</Text>
        </View>
      )}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c400,
    borderRadius: s(4),
    borderWidth: 1,
    paddingHorizontal: vs(16),
  },
  item: {
    paddingHorizontal: vs(20),
    paddingVertical: s(16),
  },
  list: {
    backgroundColor: colors.neutral.c100,
    borderRadius: s(4),
    marginTop: s(4),
  },
  separator: {
    ...globalStyles.horizontalLine,
    marginHorizontal: s(20),
  },
});

export default Dropdown;
