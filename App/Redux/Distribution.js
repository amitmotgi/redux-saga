import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  distributionWithdrawalAmount: ['amount'],
  distributionUpdate: ['info']
});

export const DistributionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  withdrawalAmount: false
});

/* ------------- Selectors ------------- */

export const DistributionSelectors = {
  withdrawalAmount: state => state.withdrawal && state.withdrawal.withdrawalAmount
};

/* ------------- Reducers ------------- */

export const updateWithdrawalAmount = (state, { amount }) => {
  return {
    ...state,
    ...amount
  };
};

export const updateDistribution = (state, { info }) => {
  return {
    ...state,
    ...info
  };
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DISTRIBUTION_WITHDRAWAL_AMOUNT]: updateWithdrawalAmount,
  [Types.DISTRIBUTION_UPDATE]: updateDistribution
});
