import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loanAmount: ['amount'],
  loanUpdate: ['info'],
  loanFetchRealtimeCryptoQuote: ['quote'],
  loanGetLtv: ['info'],
  loanCreateQuote: ['userInfo'],
  loanGetQuote: ['userInfo'],
  loanCreateCloc: ['userInfo'],
  loanGetCloc: ['userInfo'],
  loanGetClocActive: ['userInfo']
});

export const LoanTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loanAmount: null
});

/* ------------- Selectors ------------- */

export const LoanSelectors = {
  loanAmount: state => state.loanAmount
};

/* ------------- Reducers ------------- */

export const loanAmount = (state, { amount }) => {
  return {
    ...state,
    ...amount
  };
};

export const loanUpdate = (state, { info }) => {
  return {
    ...state,
    ...info
  };
}

export const fetchRealtimeCryptoQuote = (state, { quote }) => {
  return {
    ...state,
    ...quote
  };
};

export const loanGetLTV = (state, { info }) => {
  return {
    ...state,
    ...info
  };
};

export const loanCreateQuote = (state, { userInfo }) => {
  return {
    ...state,
    ...userInfo
  };
};

export const loanGetQuote = (state, { userInfo }) => {
  return {
    ...state,
    quote: {
      ...userInfo
    }
  };
};

export const loanCreateCLOC = (state, { userInfo }) => {
  return {
    ...state,
    cloc: {
      ...userInfo
    }
  };
};

export const loanGetCloc = (state, { userInfo }) => {
  return {
    ...state,
    cloc: {
      ...userInfo
    }
  };
};

export const loanGetCLOCActive = (state, { userInfo }) => {
  return {
    ...state,
    cloc: {
      ...userInfo
    }
  };
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAN_AMOUNT]: loanAmount,
  [Types.LOAN_UPDATE]: loanUpdate,
  [Types.LOAN_FETCH_REALTIME_CRYPTO_QUOTE]: fetchRealtimeCryptoQuote,
  [Types.LOAN_GET_LTV]: loanGetLTV,
  [Types.LOAN_CREATE_QUOTE]: loanCreateQuote,
  [Types.LOAN_GET_QUOTE]: loanGetQuote,
  [Types.LOAN_CREATE_CLOC]: loanCreateCLOC,
  [Types.LOAN_GET_CLOC]: loanGetCloc,
  [Types.LOAN_GET_CLOC_ACTIVE]: loanGetCLOCActive
});
