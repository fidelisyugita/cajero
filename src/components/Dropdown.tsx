import React, {forwardRef, useState} from 'react';
import {StyleSheet, TouchableOpacityProps, View} from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from 'react-native-dropdown-picker';
import {TouchableRipple} from 'react-native-paper';

import {colors, globalStyles} from '../styles';
import {fontStyle} from '../styles/fonts';
import {s, vs} from '../utils/scale';

type Size = 'large' | 'medium' | 'small';

interface DropdownProps
  extends Pick<
    DropDownPickerProps<ValueType>,
    | 'items'
    | 'setItems'
    | 'placeholder'
    | 'ArrowDownIconComponent'
    | 'ArrowUpIconComponent'
  > {
  size?: Size;
  width?: number;
}

function getStyle(size: Size) {
  const style = {
    large: {
      labelStyle: fontStyle.bodyTextXLarge,
    },
    medium: {
      labelStyle: fontStyle.bodyTextLarge,
    },
    small: {
      labelStyle: fontStyle.bodyTextMedium,
    },
  };

  return style[size];
}

function Dropdown({
  ArrowDownIconComponent,
  ArrowUpIconComponent,
  items,
  placeholder,
  size = 'large',
  width,
}: DropdownProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const {labelStyle} = getStyle(size);

  return (
    <View style={[styles.container, {width}]}>
      <DropDownPicker
        itemSeparator
        ArrowDownIconComponent={ArrowDownIconComponent}
        ArrowUpIconComponent={ArrowUpIconComponent}
        TouchComponent={Touch}
        containerStyle={styles.wrapper}
        dropDownContainerStyle={styles.dropdown}
        itemSeparatorStyle={styles.separatorItem}
        items={items}
        listItemContainerStyle={styles.listItem}
        open={open}
        placeholder={placeholder}
        setOpen={setOpen}
        setValue={setValue}
        showTickIcon={false}
        style={styles.style}
        textStyle={{color: colors.neutral.c500, ...labelStyle}}
        value={value}
      />
    </View>
  );
}

const Touch = forwardRef<View, TouchableOpacityProps>(function Touch(
  props,
  ref,
) {
  const {children, style, ...rest} = props;
  return (
    <TouchableRipple style={styles.touch} {...rest}>
      <View ref={ref} style={[style, styles.touchView]}>
        {children}
      </View>
    </TouchableRipple>
  );
});

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    ...globalStyles.shadowMedium,
    borderBottomLeftRadius: s(4),
    borderBottomRightRadius: s(4),
    borderColor: colors.neutral.c400,
    borderTopLeftRadius: s(4),
    borderTopRightRadius: s(4),
    borderWidth: 0,
    marginTop: s(4),
  },
  listItem: {
    height: s(60),
    paddingHorizontal: vs(16),
  },
  separatorItem: {
    backgroundColor: colors.neutral.c300,
    height: 1,
    marginHorizontal: vs(16),
  },
  style: {
    borderColor: colors.neutral.c400,
    borderRadius: s(4),
    borderWidth: 1,
    paddingHorizontal: vs(16),
  },
  touch: {
    backgroundColor: colors.neutral.c100,
  },
  touchView: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    gap: vs(8),
    zIndex: 3,
  },
});

export default Dropdown;
