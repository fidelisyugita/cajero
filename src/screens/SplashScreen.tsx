import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {CommonActions} from '@react-navigation/native';

import {Logo} from '../assets/svgs';
import {StackProps} from '../interfaces/NavigationInterface';
import {RootStateProps} from '../store';
import {setFirstTimeOpenApp} from '../store/commonStore';
import {colors} from '../styles';
import {s} from '../utils/scale';

function SplashScreen({navigation}: StackProps<'SplashScreen'>): JSX.Element {
  const dispatch = useDispatch();

  const {firstTimeOpenApp, isSignIn} = useSelector(
    (state: RootStateProps) => ({
      firstTimeOpenApp: state.common.firstTimeOpenApp,
      isSignIn: state.session.isSignIn,
    }),
    shallowEqual,
  );

  useEffect(() => {
    setTimeout(async () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: isSignIn ? 'SideNavigator' : 'LoginScreen',
            },
          ],
        }),
      );

      if (firstTimeOpenApp) {
        dispatch(setFirstTimeOpenApp(false));
      }
      await BootSplash.hide({fade: true});
    }, 1);
  }, []);

  return (
    <View style={styles.container}>
      {firstTimeOpenApp ? (
        <Logo height={s(50)} width={s(220)} />
      ) : (
        <ActivityIndicator color={colors.primary.c400} size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.supporting.yellow,
    flex: 1,
    justifyContent: 'center',
  },
});

export default SplashScreen;
