import { s } from "react-native-size-matters";

const Colors = {
  primary: "#215D95",
  white: "#FFFFFF",
  darkWhite: "#E8E8E8",
  black: "#000000",
  defaultText: "#4A4A4A",
  disableText: "#9B9B9B",
  inactive: "#F9F9F9",
  green: "#79B460",
  red: "#FF4747",
};

const FontSize = {
  h1: s(24),
  h2: s(20),
  h3: s(16),
  h4: s(12),
  h5: s(10.5),
};

const FontFamily = {
  bold: "Roboto-Bold", //700
  medium: "Roboto-Medium", //500
  regular: "Roboto-Regular", //400
};

const MetricsSizes: any = {
  tiny: s(4),
  small: s(8),
  medium: s(12),
  large: s(16),
  huge: s(24),
  gigantic: s(32),
};

export default {
  Colors,
  FontSize,
  FontFamily,
  MetricsSizes,
};
