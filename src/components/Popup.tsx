import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Surface} from 'react-native-paper';

import {IcX} from '../assets/svgs';
import {colors, globalStyles} from '../styles';
import {s, vs} from '../utils/scale';
import ButtonIcon from './ButtonIcon';
import Text from './Text';

type PopupProps = {
  width: number;
  height: number;
  children: ViewProps['children'];
  visible: boolean;
};

type HeaderProps = {
  title: string;
  onClose: () => void;
};

type BodyProps = {
  children: ViewProps['children'];
  style?: ViewStyle;
};
type FooterProps = {
  children: ViewProps['children'];
  style?: ViewStyle;
};

function Header({onClose, title}: HeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <Text textStyle="heading5">{title}</Text>
      <ButtonIcon
        transparent
        IconComponent={IcX}
        containerStyle={styles.close}
        size="small"
        variant="neutralNoStroke"
        onPress={onClose}
      />
    </View>
  );
}

function Body({children, style}: BodyProps): JSX.Element {
  return <View style={[styles.body, style]}>{children}</View>;
}

function Footer({children, style}: FooterProps): JSX.Element {
  return (
    <Surface elevation={1} style={[styles.footer, style]}>
      {children}
    </Surface>
  );
}

function Popup({
  children,
  height,
  visible = false,
  width,
}: PopupProps): JSX.Element {
  return (
    <Modal
      transparent
      animationType="fade"
      supportedOrientations={['landscape', 'portrait']}
      visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={globalStyles.flex}>
        <View style={styles.container}>
          <View style={[styles.card, {height: s(height), width: vs(width)}]}>
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

Popup.Header = Header;
Popup.Body = Body;
Popup.Footer = Footer;

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.neutral.c200,
    paddingVertical: s(24),
  },
  card: {
    backgroundColor: colors.neutral.c200,
    borderRadius: s(12),
    overflow: 'hidden',
  },
  close: {
    right: -s(10),
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: colors.neutral.c100,
    bottom: 0,
    left: 0,
    padding: s(24),
    position: 'absolute',
    right: 0,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.primary.c100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vs(24),
    paddingVertical: s(12),
  },
});

export default Popup;
