import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import Spacer from '../../components/Spacer';
import Text from '../../components/Text';
import {StackProps} from '../../interfaces/NavigationInterface';
import {colors, globalStyles} from '../../styles';
import {s, vs} from '../../utils/scale';
import LoginFormOwner from './components/LoginFormOwner';
import LoginFormStaff from './components/LoginFormStaff';
import Welcome from './components/Welcome';

const renderScene = SceneMap({
  owner: LoginFormOwner,
  staff: LoginFormStaff,
});

function SignIn({}): JSX.Element {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsTop =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'owner', title: 'Owner'},
    {key: 'staff', title: 'Staff'},
  ]);

  return (
    <View style={[styles.right, {paddingTop: insetsTop}]}>
      <Spacer height={56} />
      <Text style={globalStyles.textCenter} textStyle="heading2">
        {t('Sign In')}
      </Text>
      <Spacer height={64} />

      <TabView
        initialLayout={{width: vs(581)}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tab}
            tabStyle={styles.tabs}
            renderLabel={({focused, route}) => (
              <Text
                color={focused ? 'primary.c400' : 'neutral.c500'}
                textStyle="buttonLarge">
                {t(route.title)}
              </Text>
            )}
          />
        )}
        onIndexChange={setIndex}
      />
    </View>
  );
}

function LoginScreen({navigation}: StackProps<'LoginScreen'>): JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={globalStyles.flex}
        onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <Welcome
            buttonLabel={t('Sign Up')}
            buttonOnPress={() => navigation.navigate('SignUpScreen')}
          />
          <SignIn />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.c200,
    flex: 1,
  },
  indicator: {
    backgroundColor: colors.primary.c400,
    height: 2,
  },

  keyboardView: {
    flex: 1,
    flexDirection: 'row',
  },
  right: {
    backgroundColor: colors.neutral.c200,
    flex: 1,
    zIndex: 3,
  },
  tab: {
    backgroundColor: colors.neutral.c200,
    borderBottomColor: colors.neutral.c300,
    borderBottomWidth: 1,
    elevation: 0,
    marginHorizontal: vs(56),
    shadowColor: undefined,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  tabs: {
    minHeight: s(52),
  },
});

export default LoginScreen;
