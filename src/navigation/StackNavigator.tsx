import React from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useSelector} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../components/Header';
import {StackParamList} from '../interfaces/NavigationInterface';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ReceiptDetailsScreen from '../screens/receipt/ReceiptDetailsScreen';
import {RootStateProps} from '../store';
import SideNavigator from './SideNavigator';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigator(): JSX.Element {
  const {t} = useTranslation();

  const {firstTimeOpenApp, isSignIn} = useSelector(
    (state: RootStateProps) => ({
      firstTimeOpenApp: state.common.firstTimeOpenApp,
      isSignIn: state.session.isSignIn,
    }),
    shallowEqual,
  );

  const initialRouteName = () => {
    if (firstTimeOpenApp) {
      return 'SplashScreen';
    }
    if (isSignIn) {
      return 'SideNavigator';
    }
    return 'LoginScreen';
  };

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName()}
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        component={SplashScreen}
        name="SplashScreen"
        options={{freezeOnBlur: true, headerShown: false}}
      />
      {isSignIn ? (
        <>
          <Stack.Screen
            component={SideNavigator}
            name="SideNavigator"
            options={{freezeOnBlur: true, headerShown: false}}
          />
          <Stack.Screen
            component={ReceiptDetailsScreen}
            name="ReceiptDetailsScreen"
            options={{
              freezeOnBlur: true,
              header: props => <Header {...props} />,
              headerTitle: t('Receipt Details'),
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            component={LoginScreen}
            name="LoginScreen"
            options={{freezeOnBlur: true, headerShown: false}}
          />
          <Stack.Screen
            component={SignUpScreen}
            name="SignUpScreen"
            options={{freezeOnBlur: true, headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigator;
