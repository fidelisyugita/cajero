import {Platform, StatusBar} from 'react-native';

export function getCurrentHeightStatusBar(): number | undefined {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  }
  return undefined;
}
