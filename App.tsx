import 'intl-pluralrules';
import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import LoadingModal from './src/components/LoadingModal';
import AppNavigator from './src/navigation/AppNavigator';
import {persistor, store} from './src/store';
import {globalStyles} from './src/styles';
import themePaper from './src/styles/themePaper';
import './src/translations';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={themePaper}>
          <GestureHandlerRootView style={globalStyles.flex}>
            <LoadingModal />
            <StatusBar
              translucent
              backgroundColor={'transparent'}
              barStyle="dark-content"
            />
            <AppNavigator />
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
