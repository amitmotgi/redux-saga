import { Platform } from 'react-native';

export default {
  appVersion: Platform.iOS ? '1.0.0' : '1.0.0',
  buildNumber: Platform.iOS ? 1 : 1
};
