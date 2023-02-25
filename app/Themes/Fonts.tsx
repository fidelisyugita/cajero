import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

import Variables from "./Variables";

export default StyleSheet.create({
  default: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.regular,
    fontSize: Variables.FontSize.h3,
  },
  caption: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.regular,
    fontSize: Variables.FontSize.h5,
  },
  h1: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.bold,
    fontSize: Variables.FontSize.h1,
  },
  h2: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.medium,
    fontSize: Variables.FontSize.h2,
  },
  h3: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.medium,
    fontSize: Variables.FontSize.h3,
  },
  h4: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.medium,
    fontSize: Variables.FontSize.h4,
  },
  h5: {
    color: Variables.Colors.defaultText,
    fontFamily: Variables.FontFamily.medium,
    fontSize: Variables.FontSize.h5,
  },
});
