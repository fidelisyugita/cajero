import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Surface, TouchableRipple} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {
  DefaultNavigatorOptions,
  ParamListBase,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  createNavigatorFactory,
  useNavigationBuilder,
} from '@react-navigation/native';

import {
  IcBusiness,
  IcBusinessActive,
  IcCalculator,
  IcCalculatorActive,
  IcExpense,
  IcExpenseActive,
  IcGear,
  IcGearActive,
  IcMenu,
  IcMenuActive,
  IcReceipt,
  IcReceiptActive,
  IcSignOut,
  IcStock,
  Logo,
} from '../assets/svgs';
import {setIsSignIn} from '../store/sessionStore';
import {colors, globalStyles} from '../styles';
import {s, vs} from '../utils/scale';
import Spacer from './Spacer';
import Text from './Text';

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: {isAlreadyFocused: boolean};
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

const Icons = {
  BusinessScreen: [IcBusiness, IcBusinessActive],
  ExpenseScreen: [IcExpense, IcExpenseActive],
  MenuScreen: [IcMenu, IcMenuActive],
  ReceiptScreen: [IcReceipt, IcReceiptActive],
  ReportScreen: [IcCalculator, IcCalculatorActive],
  SettingScreen: [IcGear, IcGearActive],
  StockScreen: [IcStock, IcStock],
};

function SideTabNavigator({
  children,
  contentStyle,
  initialRouteName,
  screenOptions,
  tabBarStyle,
}: Props) {
  const {NavigationContent, descriptors, navigation, state} =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      initialRouteName,
      screenOptions,
    });

  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  return (
    <NavigationContent>
      <View style={styles.container}>
        <View style={{paddingRight: vs(2)}}>
          <Surface
            elevation={1}
            style={[styles.sidebar, {paddingTop: insets.top}, tabBarStyle]}
            theme={{
              colors: {
                elevation: {
                  level1: colors.supporting.yellow,
                },
              },
            }}>
            <View style={styles.topWrapper}>
              <Spacer height={24} />
              <Logo height={s(80)} width={s(80)} />
              <Spacer height={50} />
              <View style={styles.tabWrapper}>
                {state.routes.map((route, index) => {
                  const isFocused = state.index === index;
                  const Icon =
                    Icons[route.name]?.[isFocused ? 1 : 0] || IcStock;
                  return (
                    <TouchableRipple
                      key={route.key}
                      onPress={() => {
                        const event = navigation.emit({
                          canPreventDefault: true,
                          data: {
                            isAlreadyFocused: isFocused,
                          },
                          target: route.key,
                          type: 'tabPress',
                        });

                        if (!isFocused && !event.defaultPrevented) {
                          if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                          }
                        }
                      }}>
                      <View
                        style={[
                          styles.tabOuter,
                          isFocused && styles.tabOuterActive,
                        ]}>
                        <Icon
                          height={s(36)}
                          width={s(36)}
                          color={
                            isFocused
                              ? colors.primary.c400
                              : colors.primary.c300
                          }
                        />
                        <Text color="primary.c400" textStyle="labelXSmall">
                          {descriptors[route.key].options.title ?? route.name}
                        </Text>
                      </View>
                    </TouchableRipple>
                  );
                })}
              </View>
            </View>

            <TouchableRipple
              style={styles.logoutWrapper}
              onPress={() => dispatch(setIsSignIn(false))}>
              <View style={[styles.tabOuter, styles.logoutOuter]}>
                <IcSignOut
                  color={colors.primary.c400}
                  height={s(26)}
                  width={s(26)}
                />
                <Text color="primary.c400" textStyle="labelXSmall">
                  {t('Sign Out')}
                </Text>
              </View>
            </TouchableRipple>
          </Surface>
        </View>
        <View style={[globalStyles.flex, contentStyle]}>
          {state.routes.map((route, i) => {
            return (
              <View
                key={route.key}
                style={[
                  StyleSheet.absoluteFill,
                  {display: i === state.index ? 'flex' : 'none'},
                ]}>
                {descriptors[route.key].render()}
              </View>
            );
          })}
        </View>
      </View>
    </NavigationContent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.c100,
    flex: 1,
    flexDirection: 'row',
  },
  logoutOuter: {
    backgroundColor: colors.error.c100,
    borderRadius: s(8),
  },
  logoutWrapper: {
    marginBottom: s(24),
  },
  sidebar: {
    alignItems: 'center',
    // borderRightColor: colors.neutral.c300,
    // borderRightWidth: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: vs(24),
    width: vs(116),
  },
  tabOuter: {
    alignItems: 'center',
    gap: s(2),
    height: s(68),
    justifyContent: 'center',
    width: s(68),
  },
  tabOuterActive: {
    borderColor: colors.primary.c400,
    borderRadius: s(8),
    borderWidth: 1,
  },
  tabWrapper: {
    alignItems: 'center',
    gap: s(16),
  },
  topWrapper: {
    alignItems: 'center',
  },
});

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof SideTabNavigator
>(SideTabNavigator);

export const createSideTabNavigator = createNavigatorFactory(SideTabNavigator);
