import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  repayGetCards: ['userInfo'],
  repayUpdate: ['userInfo'],
  repayPayment: ['userInfo']
});

export const RepayTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({

});

export const RepaySelectors = {

};

/* ------------- Reducers ------------- */

export const repayGetCards = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const repayUpdate = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const repayment = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REPAY_GET_CARDS]: repayGetCards,
  [Types.REPAY_UPDATE]: repayUpdate,
  [Types.REPAY_PAYMENT]: repayment
});
