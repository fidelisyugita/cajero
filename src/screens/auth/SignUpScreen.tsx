import React from 'react';
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

import Spacer from '../../components/Spacer';
import Text from '../../components/Text';
import {StackProps} from '../../interfaces/NavigationInterface';
import {colors, globalStyles} from '../../styles';
import SignUpForm from './components/SignUpForm';
import Welcome from './components/Welcome';

function SignIn({}): JSX.Element {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsTop =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  return (
    <View style={[styles.right, {paddingTop: insetsTop}]}>
      <Spacer height={56} />
      <Text style={globalStyles.textCenter} textStyle="heading2">
        {t('Register')}
      </Text>
      <Spacer height={64} />
      <SignUpForm />
    </View>
  );
}

function SignUpScreen({navigation}: StackProps<'SignUpScreen'>): JSX.Element {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={globalStyles.flex}
        onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <SignIn />
          <Welcome
            reverse
            buttonLabel={t('Sign In')}
            buttonOnPress={() => navigation.navigate('LoginScreen')}
          />
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
  keyboardView: {
    flex: 1,
    flexDirection: 'row',
  },
  right: {
    backgroundColor: colors.neutral.c200,
    flex: 1,
    zIndex: 3,
  },
});

export default SignUpScreen;
