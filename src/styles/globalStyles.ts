import {StyleSheet} from 'react-native';

import {s, vs} from '../utils/scale';
import colors from './colors';

export default StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(8),
    borderWidth: 1,
    padding: s(24),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  flex: {
    flex: 1,
  },
  horizontalLine: {
    backgroundColor: colors.neutral.c300,
    height: 1,
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
  rowItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(20),
    justifyContent: 'space-between',
  },
  rowStart: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  screen: {
    backgroundColor: colors.neutral.c200,
    flex: 1,
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  shadowMedium: {
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  shrink: {
    flexShrink: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  textLineThrough: {
    textDecorationLine: 'line-through',
  },
  textNoLine: {
    textDecorationLine: 'none',
  },
});
