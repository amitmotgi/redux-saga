import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentGetCards: ['userInfo'],
  paymentAddCards: ['userInfo'],
  paymentUpdate: ['userInfo'],
  paymentGetKey: ['userInfo']
});

export const PaymentTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({

});

export const PaymentSelectors = {

};

/* ------------- Reducers ------------- */

export const getCards = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const addCards = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const updatePayment = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const getKey = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_GET_CARDS]: getCards,
  [Types.PAYMENT_ADD_CARDS]: addCards,
  [Types.PAYMENT_UPDATE]: updatePayment,
  [Types.PAYMENT_GET_KEY]: getKey
});
