import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onboardingRegisterUser: ['userInfo'],
  onboardingMobileVerify: ['userInfo'],
  onboardingRegisteredUser: ['userInfo'],
  onboardingLogin: ['userInfo'],
  onboardingFrontImage: ['front'],
  onboardingBackImage: ['back'],
  onboardingCodeVerifyResponse: ['userInfo'],
  onboardingSpinner: ['userInfo'],
  onboardingUserSsn: ['userInfo'],
  onboardingVerifyIdentityImages: ['userInfo'],
  onboardingFrontBaseImage: ['userInfo'],
  onboardingBackBaseImage: ['userInfo'],
  onboardingVerifyTransaction: ['userInfo'],
  onboardingVerifyDocumentsResponse: ['userInfo'],
  onboardingFetchCountries: ['userInfo'],
  onboardingUpdateFetchCountries: ['userInfo'],
  onboardingReviewIdentity: ['userInfo'],
  onboardingVerifyIdentity: ['userInfo'],
  onboardingUpdate: ['userInfo'],
  onboardingLoginActivateTouchid: ['activateTouchID'],
  onboardingRegisterPushNotification: ['userInfo'],
  onboardingResendCodeToMobile:['info'],
  onboardingGetUser: ['userInfo'],
  onboardingCodeStartSms: ['userInfo'],
  onboardingPasswordReset: ['userInfo']
});

export const OnboardingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  backImage: null,
  backImageBase64: null,
  frontImage: null,
  frontImageBase64: null,
  countries: '',
  countryCode: null,
  documentType: '',
  email: '',
  jToken: null,
  mobileNumber: '',
  password: '',
  phoneNumber: '',
  spinner: false,
  tcEnabled: false,
  token: null,
  username: null
});

/* ------------- Selectors ------------- */

export const OnboardingSelectors = {
  backImage: state => state.onboarding && state.onboarding.backImage,
  backImageBase64: state => state.onboarding && state.onboarding.backImageBase64,
  frontImage: state => state.onboarding && state.onboarding.frontImage,
  frontImageBase64: state => state.onboarding && state.onboarding.frontImageBase64,
  countries: state => state.onboarding && state.onboarding.countries,
  countryCode: state => state.onboarding && state.onboarding.countryCode,
  documentType: state => state.onboarding && state.onboarding.documentType,
  email: state => state.onboarding && state.onboarding.email,
  jToken: state => state.onboarding && state.onboarding.jToken,
  mobileNumber: state => state.onboarding && state.onboarding.mobileNumber,
  password: state => state.onboarding && state.onboarding.password,
  phoneNumber: state => state.onboarding && state.onboarding.phoneNumber,
  spinner: state => state.onboarding && state.onboarding.spinner,
  tcEnabled: state => state.onboarding && state.onboarding.tcEnabled,
  token: state => state.onboarding && state.onboarding.token,
  username: state => state.onboarding &&state.onboarding.username
};

/* ------------- Reducers ------------- */

export const registeredUser = (state, { userInfo }) => {
  return {
    ...state,
    email: userInfo,
    spinner: false
  };
};

export const registerUser = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo,
    spinner: true
  };
};

export const login = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const captureFrontImage = (state, { front }) => {
  return {
    ...state,
    frontImage: front
  };
};

export const captureBackImage = (state, { back }) => {
  return {
    ...state,
    backImage: back
  };
};

export const codeVerifyResponse = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const spinner = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const registerSSN = (state , { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const verifyIdentityImages = (state , { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const convertBase64FrontBaseImage = (state , { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const convertBase64BackBaseImage = (state , { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const verifyTransaction = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo,
    spinner: true
  };
};

export const verifyDocumentsResponse = (state, { userInfo }) => {
  return {
    ...state,
    documentIdentity: {
      ...userInfo.data
    }
  };
};

export const fetchCountries = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const updateCountries = (state, { userInfo }) => {
  return {
    ...state,
    countries: {
      ...userInfo
    }
  };
};

export const updateReviewIdentity = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const verifyIdentity = (state, { userInfo }) => {
  return {
    ...state,
    verifyIdentity: {
      ...userInfo
    }
  };
};

export const updateIdentity = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const loginActivateTouchid = (state, data) => {
  const { activateTouchID: { enabledTouchID } } = data;
  return {
    ...state,
    enabledTouchID
  };
};

export const mobileVerify = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const registerPushNotification = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const getUser = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const triggerSMS = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const resetPassword = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ONBOARDING_REGISTER_USER]: registerUser,
  [Types.ONBOARDING_MOBILE_VERIFY]: mobileVerify,
  [Types.ONBOARDING_REGISTERED_USER]: registeredUser,
  [Types.ONBOARDING_LOGIN]: login,
  [Types.ONBOARDING_FRONT_IMAGE]: captureFrontImage,
  [Types.ONBOARDING_BACK_IMAGE]: captureBackImage,
  [Types.ONBOARDING_CODE_VERIFY_RESPONSE]: codeVerifyResponse,
  [Types.ONBOARDING_SPINNER]: spinner,
  [Types.ONBOARDING_USER_SSN]: registerSSN,
  [Types.ONBOARDING_VERIFY_IDENTITY_IMAGES]: verifyIdentityImages,
  [Types.ONBOARDING_FRONT_BASE_IMAGE]: convertBase64FrontBaseImage,
  [Types.ONBOARDING_BACK_BASE_IMAGE]: convertBase64BackBaseImage,
  [Types.ONBOARDING_VERIFY_TRANSACTION]: verifyTransaction,
  [Types.ONBOARDING_VERIFY_DOCUMENTS_RESPONSE]: verifyDocumentsResponse,
  [Types.ONBOARDING_FETCH_COUNTRIES]: fetchCountries,
  [Types.ONBOARDING_UPDATE_FETCH_COUNTRIES]: updateCountries,
  [Types.ONBOARDING_REVIEW_IDENTITY]: updateReviewIdentity,
  [Types.ONBOARDING_VERIFY_IDENTITY]: verifyIdentity,
  [Types.ONBOARDING_UPDATE]: updateIdentity,
  [Types.ONBOARDING_LOGIN_ACTIVATE_TOUCHID]: loginActivateTouchid,
  [Types.ONBOARDING_REGISTER_PUSH_NOTIFICATION]: registerPushNotification,
  [Types.ONBOARDING_GET_USER]: getUser,
  [Types.ONBOARDING_CODE_START_SMS]: triggerSMS,
  [Types.ONBOARDING_PASSWORD_RESET]: resetPassword
});
