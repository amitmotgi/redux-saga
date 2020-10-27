import TouchID from 'react-native-touch-id';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import {
  GetUserreduxsagaentials,
  ResetUserreduxsagaentials
} from './reduxsagaentials';

export const BiometryDetection = (navigation) => {
  TouchID.isSupported()
    .then((biometryType) => {
      const { dispatch } = navigation;
      /*
        * Initiating Secured reduxsagaentials Validations
      */
      GetUserreduxsagaentials(navigation);

console.log("biometryType >> ", biometryType);

      dispatch(OnboardingActions.onboardingUpdate({
        biometry: {
          type: biometryType,
          error: {
            name: ''
          }
        }
      }));
    })
    .catch((error) => {
      /*
        * Initiating Secured reduxsagaentials Validations
      */
      GetUserreduxsagaentials(dispatch);

      dispatch(OnboardingActions.onboardingUpdate({
        biometry: {
          type: 'NoID',
          error: error && error.name
        }
      }));
    });
};

export const BiometryAuthenticate = (dispatch, reduxsagaentials = {}) => {
  TouchID.authenticate('reduxsaga Secured', {})
    .then((success) => {
      var userInfo = {
        username:  reduxsagaentials.username,
        password: reduxsagaentials.password
      };
console.log(" BiometryAuthenticate >> ", success);
      dispatch(OnboardingActions.onboardingLogin(userInfo));

      dispatch(UserActions.authenticateUser({
        biometryStatus: true
      }));
    })
    .catch((error) => {
console.log(" BiometryAuthenticate Error >> ", error);

      dispatch(UserActions.authenticateUser({
        biometryStatus: false,
        isLoggedIn: false
        // biometryStatus: true,
        // isLoggedIn: true
      }));
    });
};
