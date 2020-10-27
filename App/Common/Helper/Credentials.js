import * as Keychain from 'react-native-keychain';
import OnboardingActions from '../../Redux/Onboarding';
import UserActions from '../../Redux/User';
import { KeyChainService } from '../../Config/KeyChainConfig';
import {
  BiometryAuthenticate
} from './Biometry';

export const GetUserreduxsagaentials = (navigation) => {
  Keychain.getGenericPassword({
    service: KeyChainService.login
  }).then(reduxsagaentials => {
    console.log('>>>>>>>> reduxsagaentials', reduxsagaentials);

    const {
      username = null,
      password = null
    } = reduxsagaentials;

    const  { dispatch } = navigation;

    if (__DEV__) {
      console.log(" GetUserreduxsagaentials dispatch ", dispatch);
      console.log(" GetUserreduxsagaentials reduxsagaentials ", reduxsagaentials);
      console.log(" GetUserreduxsagaentials navigation ", navigation);
    }

    if (username && password) {
        BiometryAuthenticate(dispatch, reduxsagaentials);
    } else {
      // some missing data reset Keychain
      ResetUserreduxsagaentials(dispatch);
      navigation.dispatch(UserActions.authenticateUser({
        isLoggedIn: false
      }));
    }
  })
  .catch((error) => {
    const  { dispatch } = navigation;

    ResetUserreduxsagaentials(dispatch);
    navigation.dispatch(UserActions.authenticateUser({
      isLoggedIn: false
    }));
  });
};

export const SetUserreduxsagaentials = (reduxsagaentials) => {
  const username = reduxsagaentials.username || '';
  const password = reduxsagaentials.password || '';

  // set reduxsagaentials
  Keychain.setGenericPassword(username, password, {
    service: KeyChainService.login
  }).then((res) => {
    console.log(" SetUserreduxsagaentials >>> ", res);
  })
  .catch((error) => {
    console.log(" Failed to SetUserreduxsagaentials >>> ", error);
  });
};

export const ResetUserreduxsagaentials = (dispatch) => {
  Keychain.resetGenericPassword({
    service: KeyChainService.login
  }).then((res) => {

  })
  .catch((error) => {

  });
};
