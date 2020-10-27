import TouchID from 'react-native-touch-id';
import { Alert } from 'react-native';
import Colors from '../Themes/Colors';

export const loginNavigateTo = 'Dashboard';

export const TouchIDIsSupported = ({
    TouchIDCallBack,
    FaceIDCallBack,
    NotSupportedCallBack
  }) => {
  TouchID.isSupported()
    .then(biometryType => {
      console.log('biometryType', biometryType);
      // Success code
      if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
        if (typeof FaceIDCallBack === 'function') {
          FaceIDCallBack();
        }
      } else {
        console.log('TouchID is supported.');
        if (typeof TouchIDCallBack === 'function') {
          TouchIDCallBack();
        }
      }
    })
    .catch(error => {
      console.warn('TOUCHIDERROR', error);
      // if (error&&error.name === 'RCTTouchIDNotSupported') {
      //   // then we do not show any touchID enabling setting
      // }
      if (typeof NotSupportedCallBack === 'function') {
        NotSupportedCallBack();
      }
    });
};

const initialOptionalConfig = {
  title: 'Authentication Required', // Android
  color: Colors.reduxsagaRed, // Android,
  fallbackLabel: '' // iOS (if empty, then label is hidden),if fallBack clicked, find the error's detail name
};

export const TouchIDAuthenticate = ({
    tips = '',
    optionalConfigObject = initialOptionalConfig,
    alertSucceedTips = 'Authenticated Successfully',
    alertSucceed = false,
    alertFailedTips = 'Authenticated Failed',
    alertFailed = false,
  } = {}) => {

  const promise = new Promise((resolve,reject)=>{
    TouchID.authenticate(tips, optionalConfigObject)
      .then(() => {
        if (alertSucceed) {
          Alert.alert(alertSucceedTips);
        }
        resolve();
      })
      .catch(error => {
        if (alertFailed) {
          Alert.alert(alertFailedTips);
        }
        reject(error);
      });
  });
  return promise;
};
