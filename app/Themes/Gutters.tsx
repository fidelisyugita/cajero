import { StyleSheet } from 'react-native';

import Variables from './Variables';

const gutters: any = StyleSheet.create({
  ...Object.entries(Variables.MetricsSizes).reduce(
    (acc, [key, value]) => ({
      ...acc,
      /* Margins */
      [`${key}Margin`]: {
        margin: value,
      },
      [`${key}BMargin`]: {
        marginBottom: value,
      },
      [`${key}TMargin`]: {
        marginTop: value,
      },
      [`${key}RMargin`]: {
        marginRight: value,
      },
      [`${key}LMargin`]: {
        marginLeft: value,
      },
      [`${key}VMargin`]: {
        marginVertical: value,
      },
      [`${key}HMargin`]: {
        marginHorizontal: value,
      },
      /* Paddings */
      [`${key}Padding`]: {
        padding: value,
      },
      [`${key}BPadding`]: {
        paddingBottom: value,
      },
      [`${key}TPadding`]: {
        paddingTop: value,
      },
      [`${key}RPadding`]: {
        paddingRight: value,
      },
      [`${key}LPadding`]: {
        paddingLeft: value,
      },
      [`${key}VPadding`]: {
        paddingVertical: value,
      },
      [`${key}HPadding`]: {
        paddingHorizontal: value,
      },
      [`${key}Width`]: {
        width: value,
      },
      [`${key}Height`]: {
        height: value,
      },
    }),
    {}
  ),
});
export default gutters;
