import { NativeModules, Platform } from 'react-native';
import AppDetails from '../Constants/AppDetails';
import DeviceInfo from 'react-native-device-info';
const RNSegmentAnalytics = NativeModules.RNSegmentAnalytics;

const disableAnalytics = __DEV__;

export const trackEvent = (eventString, properties) => {
  if (disableAnalytics) {
   return;
  }

  const deviceManufacturer = DeviceInfo.getManufacturer();
  const deviceModel = DeviceInfo.getModel();
  const country = DeviceInfo.getDeviceCountry();
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';
  const osVersion = Platform.OS === 'ios' ? ('ios' + DeviceInfo.getSystemVersion()) :
    ('android' + DeviceInfo.getSystemVersion());
  const appVersion = AppDetails.appVersion;
  const eventProps = {
    device_manufacturer: deviceManufacturer,
    device_model: deviceModel,
    country: country,
    platform: platform,
    os_version: osVersion,
    app_version: appVersion,
    ...properties,
  };

  RNSegmentAnalytics.track(eventString, eventProps);
};

export const identify = (userEmail, customerID) => {
  if (disableAnalytics) {
   return;
  }

  var traits = {
    device_id: DeviceInfo.getUniqueID(),
  };

  if (customerID) {
    traits = {
      customer_id: customerID.toString(),
      device_id: DeviceInfo.getUniqueID(),
    };
  }
  RNSegmentAnalytics.alias(userEmail);
  RNSegmentAnalytics.identify(userEmail, traits);
};

export const logScreen = (screenName) => {
  if (disableAnalytics) {
   return;
  }
  RNSegmentAnalytics.screen(screenName);
};
