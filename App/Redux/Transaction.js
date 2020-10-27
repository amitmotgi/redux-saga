import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  transactionGetAll: ['userInfo'],
  transactionUpdate: ['userInfo']
});

export const TransactionTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({

});

export const TransactionSelectors = {

};

/* ------------- Reducers ------------- */

export const transactionGetAll = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const transactionUpdate = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSACTION_GET_ALL]: transactionGetAll,
  [Types.TRANSACTION_UPDATE]: transactionUpdate
});
