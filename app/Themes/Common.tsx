import { StyleSheet } from 'react-native';

import Gutters from './Gutters';
import Layout from './Layout';
import Variables from './Variables';

export default StyleSheet.create({
  allAbsolute: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  backgroundPrimary: {
    backgroundColor: Variables.Colors.primary,
  },
  backgroundWhite: {
    backgroundColor: Variables.Colors.white,
  },
  bottomAbsolute: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  screen: {
    ...Layout.fill,
    backgroundColor: Variables.Colors.white,
  },
  scrollScreen: {
    ...Layout.grow,
    ...Gutters.hugeBPadding,
    backgroundColor: Variables.Colors.white,
  },
  separator24: {
    height: Variables.MetricsSizes.huge,
  },
  shadow1: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  shadow2: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  textCapital: {
    textTransform: 'capitalize',
  },
  topAbsolute: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  topRightAbsolute: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
