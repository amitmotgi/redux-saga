import { delay } from 'redux-saga';
import {
  take,
  put,
  call,
  fork,
  select,
  takeEvery,
  takeLatest,
  all
} from 'redux-saga/effects';
import { path } from 'ramda';
import OnboardingActions from '../Redux/Onboarding';
import UserActions from '../Redux/User';
import WalletActions from '../Redux/Wallet';
import * as TYPES from '../Constants/Types';
import { EventRegister } from 'react-native-event-listeners';

/*
  Fork - performs a non-blocking operation on the function passed.
  Take - pauses until action received.
  Race - runs effects simultaneously, then cancels them all once one finishes.
  Call - runs a function. If it returns a promise, pauses the saga until the promise is resolved.
  Put  - dispatches an action.
  Select - Runs a selector function to get data from the state
  takeLatest - means we are going to execute the operations, then return only the results of the last one call. If we trigger several cases, it’s going to ignore all of them except the last one.
  takeEvery - will return results for all the calls triggered.
*/

export function* signup(api, action) {
  const { userInfo } = action;
  var response = null;

  try {
    response = yield call(api.onboarding.signUp, userInfo);

console.log(" Signup - response >>> ", response);

    if (response && response.ok) {
      var uuid = response.data && response.data.uuid || '';
      var kycStatus = response.data && response.data.kyc_details &&
        response.data.kyc_details.status || '';
      var kycVerificationDate = response.data && response.data.kyc_details &&
        response.data.kyc_details.kyc_verification_date || '';
      var mobileVerified = response.data && response.data.kyc_details &&
        response.data.mobile_number_verified || '';

      yield put(OnboardingActions.onboardingLogin({
        username: userInfo.username,
        password: userInfo.password,
        viaSignup: true
      }));

      yield put(UserActions.authenticateUser({
        uuid,
        codeVerifyStart: true,
        showError: false,
        kycStatus: kycStatus,
        kycVerificationDate: kycVerificationDate,
        mobileVerified: mobileVerified
      }));
    } else {
      let message = response && response.data || '';
      yield put(UserActions.authenticateUser({
        codeVerifyStart: false,
        errorMessage: message,
        showError: true,
        kycStatus: kycStatus
      }));
    }
  } catch (error) {
      let message = response && response.data || '';
      yield put(UserActions.authenticateUser({
        codeVerifyStart: false,
        errorMessage: response && response.data || '',
        showError: true,
        kycStatus: kycStatus
      }));
    }
  }

export function* mobileVerify(api, action) {
  const { userInfo } = action;
  var response = null;

  try {
    response = yield call(api.onboarding.mobileVerify, userInfo);
console.log(" mobileVerify >>>>", response);
//////
// yield put(UserActions.authenticateUser({
//   codeVerify: true,
//   invalidCode: false
// }));
//////
    if (response && response.ok && response.data !== null) {

      yield put(UserActions.authenticateUser({
        codeVerify: true,
        invalidCode: false,
        codeVerifyStart: false
      }));
    } else {
      yield put(UserActions.authenticateUser({
        codeVerify: false,
        invalidCode: true,
        codeVerifyStart: true
      }));
    }
  } catch (error) {
    yield put(UserActions.authenticateUser({
      codeVerify: false,
      invalidCode: true,
      codeVerifyStart: true
    }));
  }
}

export function* resendCodeToMobile(api, action) {
  const { info } = action;
  let response = null;
  try {
    response = yield call(api.onboarding.resendCodeToMobile, info);

    if (response && response.ok) {
      yield put(UserActions.authenticateUser({
        codeVerify: true
      }));
    } else {
      yield put(UserActions.authenticateUser({
        codeVerify: false
      }));
    }
  } catch (error) {
    yield put(UserActions.authenticateUser({
      codeVerify: false
    }));
  }
}

export function* registerPushNotification(api, action) {
  const { userInfo } = action;

  try {
    response = yield call(api.onboarding.registerPushNotification, userInfo);


  } catch (err) {

  }
}

export function* login(api, action) {
  const { userInfo } = action;

  const response = yield call(api.onboarding.login, userInfo);
console.log(" login >>>> ", response)

  try {
    if (response && response.ok) {
      yield put(OnboardingActions.onboardingGetUser({
        jToken: response.data && response.data.token || '',
        uuid: response.data.uuid || ''
      }));

      yield put(UserActions.authenticateUser({
        isLoggedIn: true,
        jToken: response.data && response.data.token || '',
        loginError: false,
        uuid: response.data.uuid || ''
      }));

      yield put(OnboardingActions.onboardingFetchCountries({
        jToken: response.data && response.data.token || ''
      }));

    } else {
      // TODO - need to trigger action to show error case when API fails
      // yield put(OnboardingActions.onboardingSpinner({spinner: false}));
      yield put(UserActions.authenticateUser({
        isLoggedIn: false,
        token: '',
        loginError: true,
        loginErrorMsg: response.data || ''
      }));
    }
  } catch (error) {
    yield put(UserActions.authenticateUser({
      isLoggedIn: false,
      token: '',
      loginError: true,
      loginErrorMsg: response && response.data || ''
    }));
  }
};

export function* codeStartSMS(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.onboarding.codeStartSMS, {
      username: userInfo.username || '',
      jToken: userInfo.jToken
    });

    if (response && response.ok) {
      yield put(UserActions.authenticateUser({
        ...response.data,
        codeVerifyStart: false
      }));
    } else {
      yield put(UserActions.authenticateUser({
        codeVerify: false,
        codeVerifyStart: false
      }));
    }
  } catch (error) {
    // update action to catch error
    yield put(UserActions.authenticateUser({
      codeVerify: false,
      codeVerifyStart: false
    }));
  }
};

export function* passwordReset(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.onboarding.passwordReset, {
      newpassword: userInfo.resetPassword || '',
      token: userInfo.token,
      username: userInfo.username
    });

    if (response && response.ok && response.data !== null) {
      yield put(UserActions.authenticateUser({
        resetPasswordStatus: true
      }));
    } else {
      yield put(UserActions.authenticateUser({
        resetPasswordStatus: false
      }));
    }
  } catch (error) {
    // update action to catch error
    yield put(UserActions.authenticateUser({
      resetPasswordStatus: false
    }));
  }
};

export function* getUser(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.onboarding.getUser, {
      jToken: userInfo.jToken || '',
      uuid: userInfo.uuid || ''
    });

console.log("getUser >>>>>> response ", response);

    if (response && response.ok) {
      yield put(UserActions.authenticateUser({
        kycStatus: response.data.kyc_details && response.data.kyc_details.status || '',
        kycVerificationDate: response.data.kyc_details &&
          response.data.kyc_details.kyc_verification_date || '',
        mobileVerified: response.data && response.data.mobile_number_verified || false,
        firstName: response.data.first_name || '',
        validateNow: true
      }));
    }
  } catch (error) {
    // update action to catch error
  }
}

export function* verifyImages(api, action) {
  const { userInfo } = action;
  try {
    const response = yield call(api.onboarding.verifyImages, userInfo);

console.log(' verifyImages response >>> ', response);

    if (response && response.ok) {
      yield put(OnboardingActions.onboardingVerifyTransaction({
        transactionID: response.data.id || 0,
        spinner: true,
        identityVerify: false,
        jToken: userInfo.jToken,
        uuid: userInfo.uuid
      }));

      // clearing the redux with the Base64 image
      yield put(OnboardingActions.onboardingUpdate({
        backImageBase64: '',
        frontImageBase64: ''
      }));
    } else {
      EventRegister.emit('documentsVerify', {status: false});

      // TODO - need to trigger action to show error case when API fails
      yield put(OnboardingActions.onboardingSpinner({spinner: true}));
    }
  } catch (error) {

  }
}

function* documentAsyncValidation(data) {
  // retry validting until 1 minute
  for (let i = 0; i < 12; i++) {
    try {

      const response = yield call(data.api.onboarding.validateTransaction, {
        transactionID: data.transactionID,
        jToken: data.jToken,
        uuid: data.uuid
      });

console.log(' documentAsyncValidation response >>> ', response);

      if (response.data && (response.data.kyc_status === 'REVIEW' ||
          response.data.kyc_status === 'SUCCESS')) {
        if (response && response.ok) {
          yield put(OnboardingActions.onboardingVerifyDocumentsResponse(response));
        }
        if (!data.identityVerify) {
          // this USER failed the KYC
          EventRegister.emit('documentsVerify', {status: true});
        }
        return response;
      }

      if (i < 12  && response.ok
          && response.data.kyc_status === 'PENDING') {
        yield call(delay, 5000);
      } else {
        if (!data.identityVerify) {
          // this USER failed the KYC
          EventRegister.emit('documentsVerify', {status: true});
        }
      }

    } catch (err) {
      EventRegister.emit('documentsVerify', {status: true});
    }
  }

  // executed after 1 min of trying
  EventRegister.emit('documentsVerify', {status: true});

  // attempts failed after 5 attempts
  throw new Error('API request failed to Validate License Document');
}

export function* validateTransaction(api, action) {
  const { userInfo } = action;
  try {
    const response = yield call(documentAsyncValidation, {
      api,
      transactionID: userInfo.transactionID || 0,
      identityVerify: userInfo.identityVerify,
      jToken: userInfo.jToken,
      uuid: userInfo.uuid
    });

    if (response && response.ok) {
      yield put(OnboardingActions.onboardingVerifyDocumentsResponse(response));

      if (userInfo.identityVerify) {

        if (response.data.kyc_status === 'REVIEW' ||
          response.data.kyc_status === 'SUCCESS') {
          yield put(UserActions.authenticateUser({
            identityVerify: true
          }));
          EventRegister.emit('identityVerified', {status: true});
        }
      }

    } else {
      if (userInfo.identityVerify) {
        EventRegister.emit('identityVerified', {status: false});
      }
    }

  } catch (error) {
    // update action to catch error
  }
}

export function* fetchCountriesList(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.onboarding.fetchCountries, userInfo);

    if (response && response.ok) {
      var countryCodes = response.data.country_codes || {};
      yield put(OnboardingActions.onboardingUpdateFetchCountries(countryCodes));
    }

  } catch (error) {
    // update action to catch error
  }
}

export function* verifyIdentity(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.onboarding.verifyIdentity, userInfo);

console.log(' verifyIdentity response >>', response);
console.log(' verifyIdentity userInfo >>', userInfo);

    if (response && response.ok) {
      yield put(OnboardingActions.onboardingVerifyTransaction({
        transactionID: response.data.id || 0,
        identityVerify: true,
        jToken: userInfo.jToken,
        uuid: userInfo.uuid
      }));

      dispatch(WalletActions.walletGetAddresses({
        uuid: userInfo.uuid,
        jToken: userInfo.jToken
      }));

      yield put(UserActions.authenticateUser({
        isLoggedIn: true
      }));
    } else {

    }
  } catch (error) {

  }
}
