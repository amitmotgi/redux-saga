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
import WalletActions from '../Redux/Wallet';
import LoanActions from '../Redux/Loan';

import * as TYPES from '../Constants/Types';

export function* walletGetAddresses(api, action) {
  const { userInfo } = action;

  const response = yield call(api.wallet.getWalletAddresses, userInfo);

console.log(" Wallet addresses >> ", response);
  try {
    if (response && response.ok) {

      yield put(LoanActions.loanFetchRealtimeCryptoQuote({
        symbol: 'BTC',
        convert: 'USD'
      }));
      yield put(LoanActions.loanFetchRealtimeCryptoQuote({
        symbol: 'ETH',
        convert: 'USD'
      }));
      yield put(LoanActions.loanFetchRealtimeCryptoQuote({
        symbol: 'LBA',
        convert: 'USD'
      }));

      yield put(WalletActions.walletUpdate({
        [response.data.balances[0].type]: response.data && response.data.balances[0],
        [response.data.balances[1].type]: response.data && response.data.balances[1],
        [response.data.balances[2].type]: response.data && response.data.balances[2],
        success: response.data.success
      }));
    } else {

    }
  } catch (error) {
    //
  }
};
