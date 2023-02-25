import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCenter: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  colVCenter: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  fill: {
    flex: 1,
  },
  fullHeight: {
    height: '100%',
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate180: {
    transform: [{ rotate: '180deg' }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowHCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowStretch: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  shrink: {
    flexShrink: 1,
  },
});
