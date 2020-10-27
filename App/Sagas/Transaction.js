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
import TransactionActions from '../Redux/Transaction';
import * as TYPES from '../Constants/Types';


export function* getTransactions(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.transactions.getTransactions, userInfo);

console.log(" response >>>> ", response);
    if (response && response.ok) {

      if (response.data && response.data.content) {
        yield put(TransactionActions.transactionUpdate(response.data.content));
      }
    } else {

    }
  } catch (error) {
    //
  }
};
