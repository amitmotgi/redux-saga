import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  withDrawGetCards: ['userInfo'],
  withDrawUpdate: ['userInfo'],
  withDrawPayment: ['userInfo']
});

export const WithdrawTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({

});

export const WithdrawSelectors = {

};

/* ------------- Reducers ------------- */

export const withDrawGetCards = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const withDrawUpdate = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const withDrawPayment = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WITH_DRAW_GET_CARDS]: withDrawGetCards,
  [Types.WITH_DRAW_UPDATE]: withDrawUpdate,
  [Types.WITH_DRAW_PAYMENT]: withDrawPayment
});
