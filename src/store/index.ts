/* eslint-disable sort-exports/sort-exports */
import {MMKV} from 'react-native-mmkv';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  Storage,
  persistReducer,
  persistStore,
} from 'redux-persist';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {api} from '../services/api';
import common from './commonStore';
import menuChoose from './menuChooseStore';
import menuOrder from './menuOrderStore';
import menu from './menuStore';
import orderDiscount from './orderDiscountStore';
import productCreate from './productCreateStore';
import refund from './refundStore';
import session, {initialSessionState} from './sessionStore';

const reducers = combineReducers({
  common,
  menu,
  menuChoose,
  menuOrder,
  orderDiscount,
  productCreate,
  refund,
  session,
  [api.reducerPath]: api.reducer,
});

const storage = new MMKV();
export const reduxStorage: Storage = {
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
};

const persistVersion = 1;

const persistConfig: PersistConfig<any> = {
  key: 'root',
  migrate: (state: any) => {
    if (persistVersion > (state?._persist.version || 1)) {
      return Promise.resolve({
        ...state,
        session: {
          ...initialSessionState,
        },
      });
    }
    return Promise.resolve(state);
  },
  storage: reduxStorage,
  version: 1,
  whitelist: ['session'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
  reducer: persistedReducer,
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootStateProps = ReturnType<typeof reducers>;

export {store, persistor};
