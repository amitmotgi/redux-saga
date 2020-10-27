import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authenticateUser: ['userInfo'],
  authenticateUserLogout: ['']
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  biometryStatus: false,
  codeVerify: false,
  codeVerifyStart: false,
  deviceToken: null,
  showError: false,
  errorMessage: null,
  jToken: null,
  loginError: false,
  token: null,
  loginErrorMsg: null,
  kycStatus: null,
  mobileNumberVerified: false,
  mobileVerified: false,
  validateNow: false
});

/* ------------- Selectors ------------- */

export const UserSelectors = {
  isLoggedIn: state => state.user && state.user.isLoggedIn,
  biometryStatus: state => state.user && state.user.biometryStatus,
  codeVerify: state => state.user && state.user.codeVerify,
  codeVerifyStart: state => state.user && state.user.codeVerifyStart,
  deviceToken: state => state.user && state.user.deviceToken,
  showError: state => state.user && state.user.showError,
  errorMessage: state => state.user && state.user.errorMessage,
  jToken: state => state.user && state.user.jToken,
  loginError: state => state.user && state.user.loginError,
  token: state => state.user && state.user.token,
  loginErrorMsg: state => state.user && state.user.loginErrorMsg,
  kycStatus: state => state.user && state.user.kycStatus,
  mobileNumberVerified: state => state.user && state.user.mobileNumberVerified
};

/* ------------- Reducers ------------- */

export const updateUser = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const logoutUser = (state) => {
  return {
    ...state,
    jToken: ''
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTHENTICATE_USER]: updateUser,
  [Types.AUTHENTICATE_USER_LOGOUT]: logoutUser
});
