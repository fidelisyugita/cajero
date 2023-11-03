import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {colors} from '../styles';
import {s} from '../utils/scale';

type DashedLineProps = {
  axis?: string;
  dashColor?: string;
  dashGap?: number;
  dashLength?: number;
  dashStyle?: ViewStyle;
  dashThickness?: number;
  style?: ViewStyle;
};

function DashedLine({
  axis = 'horizontal',
  dashColor = colors.warning.c200,
  dashGap = 0,
  dashLength = 4,
  dashStyle,
  dashThickness = 2,
  style,
}: DashedLineProps) {
  const [lineLength, setLineLength] = useState(0);
  const isRow = axis === 'horizontal';
  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

  const dashStyles = useMemo(
    () => ({
      backgroundColor: dashColor,
      borderRadius: s(100),
      height: isRow ? dashThickness : dashLength,
      marginBottom: isRow ? 0 : dashGap,
      marginRight: isRow ? dashGap : 0,
      width: isRow ? dashLength : dashThickness,
    }),
    [dashColor, dashGap, dashLength, dashThickness, isRow],
  );

  return (
    <View
      style={[style, isRow ? styles.row : styles.column]}
      onLayout={event => {
        const {height, width} = event.nativeEvent.layout;
        setLineLength(isRow ? width : height);
      }}>
      {[...Array(numOfDashes)].map((_, i) => {
        return <View key={i} style={[dashStyles, dashStyle]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

export default memo(DashedLine);
