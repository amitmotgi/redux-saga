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
import PaymentActions from '../Redux/Payment';
import * as TYPES from '../Constants/Types';

export function* getCards(api, action) {
  const { userInfo } = action;

  const response = yield call(api.payment.getCards, userInfo);

console.log(" PAYMENT getCards ", response);

  try {
    if (response.status === 400 && response.data.indexOf('DebitCard not found') !== -1) {
      yield put(PaymentActions.paymentUpdate({
        numOfCards: 0
      }));
    } else if (response && response.ok) {
      yield put(PaymentActions.paymentUpdate(response.data));
    }

  } catch (error) {
    // yield put(PaymentActions.paymentUpdate({
    //   error: response.data
    // }));
  }
};

export function* addCards(api, action) {
  const { userInfo } = action;

  const response = yield call(api.payment.addCards, userInfo);

console.log("addCards response >> ", response);

  try {
    if (response && response.ok) {
      yield put(PaymentActions.paymentUpdate(response.data));
      yield put(PaymentActions.paymentUpdate({
        cardAddStatus: 'added'
      }));

    } else {
      yield put(PaymentActions.paymentUpdate({
        cardAddStatus: 'notAdded'
      }));
    }
  } catch (error) {
    yield put(PaymentActions.paymentUpdate({
      cardAddStatus: 'notAdded'
    }));
  }
};


export function* getKey(api, action) {
  const { userInfo } = action;

  const response = yield call(api.payment.getKey, userInfo);

console.log(" PAYMENT getKey >>>>> ", response);

  try {
    if (response && response.ok) {
      yield put(PaymentActions.paymentUpdate({
        keyData: response.data
      }));
    }

  } catch (error) {
    // yield put(PaymentActions.paymentUpdate({
    //   error: response.data
    // }));
  }
};
