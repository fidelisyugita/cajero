import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Logo} from '../../../assets/svgs';
import Button from '../../../components/Button';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {colors, globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';

type LoginWelcomeProps = {
  reverse?: boolean;
  buttonOnPress: () => void;
  buttonLabel: string;
};

function Ball({reverse = false}: {reverse?: boolean}): JSX.Element {
  const insets = useSafeAreaInsets();
  const insetsTop =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;
  return (
    <>
      <View
        style={[
          styles.ball,
          styles.ball1,
          {[reverse ? 'left' : 'right']: -s(129), top: -s(266) - insetsTop},
        ]}
      />
      <View
        style={[
          styles.ball,
          styles.ball2,
          {
            [reverse ? 'right' : 'left']:
              vs(141) + insets[reverse ? 'right' : 'left'],
            top: s(244) + insetsTop,
          },
        ]}
      />
      <View
        style={[
          styles.ball,
          styles.ball3,
          {
            bottom: s(348),
            [reverse ? 'right' : 'left']:
              vs(252) + insets[reverse ? 'right' : 'left'],
          },
        ]}
      />
      <View
        style={[
          styles.ball,
          styles.ball4,
          {[reverse ? 'left' : 'right']: -s(55), bottom: s(178)},
        ]}
      />
      <View
        style={[
          styles.ball,
          styles.ball5,
          {bottom: -s(203), [reverse ? 'right' : 'left']: -vs(42)},
        ]}
      />
    </>
  );
}

function LoginWelcome({
  buttonLabel,
  buttonOnPress,
  reverse,
}: LoginWelcomeProps): JSX.Element {
  const {t} = useTranslation();

  return (
    <Surface elevation={4} style={styles.left}>
      <Ball reverse={reverse} />
      <Text style={globalStyles.textCenter} textStyle="heading1">
        {t('Welcome to Your Point of Sale!')}
      </Text>

      <Logo height={s(320)} width={s(320)} />

      <Text style={globalStyles.textCenter} textStyle="bodyTextXLarge">
        {t('Welcome POS Description')}
      </Text>

      <Spacer height={32} />

      <Button
        containerStyle={styles.btnSignup}
        variant="secondary"
        onPress={buttonOnPress}>
        {buttonLabel}
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  ball: {
    backgroundColor: colors.supporting.red,
    borderRadius: s(2000),
    position: 'absolute',
  },
  ball1: {
    height: s(467),
    right: -s(129),
    width: s(467),
  },
  ball2: {
    height: s(70),
    width: s(70),
  },
  ball3: {
    height: s(38),
    width: s(38),
  },
  ball4: {
    height: s(111),
    width: s(111),
  },
  ball5: {
    height: s(345),
    width: s(345),
  },
  btnSignup: {
    minWidth: vs(200),
  },
  left: {
    backgroundColor: colors.supporting.yellow,
    height: s(1024),
    width: vs(785),
    ...globalStyles.center,
  },
});

export default LoginWelcome;
