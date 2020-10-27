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
import RepayActions from '../Redux/Repay';
import * as TYPES from '../Constants/Types';

export function* repayment(api, action) {
  const { userInfo } = action;

  const response = yield call(api.repay.repayment, userInfo);

  try {
    if (response && response.ok) {

      yield put(RepayActions.repayUpdate(response.data));
      yield put(RepayActions.repayUpdate({
        repaySuccess: true
      }));

    } else {
      // yield put(RepayActions.repayUpdate({
      //   repaySuccess: false
      // }));
    }
  } catch (error) {
    // yield put(RepayActions.repayUpdate({
    //   repaySuccess: false
    // }));
  }
};
