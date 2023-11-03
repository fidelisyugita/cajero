import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {RootStateProps} from '../store';
import {colors} from '../styles';

function LoadingModal(): JSX.Element {
  const visible = useSelector(
    (state: RootStateProps) => state.common.globalLoadingVisible,
  );

  return (
    <Modal
      transparent
      animationType="fade"
      supportedOrientations={['landscape', 'portrait']}
      visible={visible}>
      <View style={styles.container}>
        <View style={styles.background}>
          <ActivityIndicator color={colors.primary.c400} size="large" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default LoadingModal;
