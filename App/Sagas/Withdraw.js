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
import WithdrawActions from '../Redux/Withdraw';
import * as TYPES from '../Constants/Types';


export function* withDrawPayment(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.withdraw.withDrawPayment, userInfo);

console.log(" withDrawPayment >>>>> response >>>> ", response);

    if (response && response.ok) {

      yield put(WithdrawActions.withDrawUpdate(response.data));
      yield put(WithdrawActions.withDrawUpdate({
        withDrawComplete: true
      }));

    } else {

    }
  } catch (error) {
    //
  }
};
