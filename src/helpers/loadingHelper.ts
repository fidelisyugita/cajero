import {store} from '../store';
import {setGlobalLoadingVisible} from '../store/commonStore';

export function showLoading() {
  store.dispatch(setGlobalLoadingVisible(true));
}

export function hideLoading() {
  store.dispatch(setGlobalLoadingVisible(false));
}
