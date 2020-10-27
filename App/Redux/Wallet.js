import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  walletGetAddresses: ['userInfo'],
  walletUpdate: ['userInfo']
});

export const WalletTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  walletAddresses: null
});

/* ------------- Selectors ------------- */

export const WalletSelectors = {
  walletAddresses: state => state.walletAddresses
};

/* ------------- Reducers ------------- */

export const walletGetAddresses = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const walletUpdate = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WALLET_GET_ADDRESSES]: walletGetAddresses,
  [Types.WALLET_UPDATE]: walletUpdate,
});
