import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type BottomNavigatorParamList = {
  HomeScreen: undefined;
  NoteTaskScreen: undefined;
  PipelineScreen: undefined;
  KeyAccountScreen: undefined;
  ProfileScreen: undefined;
};

export type BottomNavigatorProps<T extends keyof BottomNavigatorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomNavigatorParamList, T>,
    StackProps<keyof StackParamList>
  >;

export type SideNavigatorParamList = {
  MenuScreen: undefined;
  StockScreen: undefined;
  ReportScreen: undefined;
  SettingScreen: undefined;
  ReceiptScreen: undefined;
};

export type StackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ReceiptDetailsScreen: {
    id: number;
  };
  OrderTransactionScreen: undefined;
  SideNavigator: NavigatorScreenParams<SideNavigatorParamList>;
};

export type StackProps<T extends keyof StackParamList> = NativeStackScreenProps<
  StackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
