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
import LoanActions from '../Redux/Loan';
import * as TYPES from '../Constants/Types';

export function* fetchRealtimeCrytoQuote(api, action) {
  const { quote } = action;

  try {

console.log(" quote >>>> ", quote)
    const response = yield call(api.loan.fetchRealtimeQuote, {
      symbol: quote.symbol,
      convert: quote.convert,
      jToken: quote.jToken
    });

    if (response && response.ok) {
      var data = response.data || {};

      yield put(LoanActions.loanUpdate({
        [data.coin]: {
          price: data.price,
          conversion: data.convert
        }
      }));
    }

  } catch (error) {
    // update action to catch error
  }
};

export function* loanGetSettings(api, action) {
  const { userInfo } = action;

  const response = yield call(api.loan.getLoanSettings, userInfo);
  try {
    if (response && response.ok) {

      yield put(LoanActions.loanUpdate({
        loanSettings: response.data[0]
      }));

    } else {

    }
  } catch (error) {
    //
  }
};

export function* loanCreateQuote(api, action) {
  const { userInfo } = action;

  const response = yield call(api.loan.createLoanQuote, userInfo);
  try {

console.log("loanCreateQuote >>> ", response);

    if (response && response.ok) {

      yield put(LoanActions.loanUpdate({
        loanID: response.data.id || '',
        loanStatus: response.data.status || '',
      }));

      yield put(LoanActions.loanGetQuote({
        transactionID: response.data.id || '',
        jToken: userInfo.jToken,
        uuid: userInfo.uuid
      }));

    } else {

    }
  } catch (error) {
    //
  }
};

function* QuotePolling(data) {

  for (let i = 0; i < 12; i++) {
    try {
console.log(" QuotePolling >> ", data);

      const response = yield call(data.api.loan.getLoanQuote, {
        transactionID: data.transactionID,
        jToken: data.jToken,
        uuid: data.uuid
      });

console.log(" response >> ", response);

      yield put(LoanActions.loanUpdate({
        quote: response.data,
        loanID: response.data.id || '',
        loanStatus: response.data.status || '',
      }));

      if (response && (response.data.status === 'REJECTED' ||
          response.data.status === 'APPROVED')) {

        return response;
      }

      if (i < 12  && response && response.data.status === 'PENDING') {
        yield call(delay, 5000);
      } else {
        return response;
      }
    } catch (err) {

    }

  }
};

export function* loanGetQuote(api, action) {
  const { userInfo } = action;

  try {

    const response = yield call(QuotePolling, {
      api,
      uuid: userInfo.uuid || '',
      transactionID: userInfo.transactionID || '',
      jToken: userInfo.jToken || '',
    });

console.log(" loanGetQuote >>> ", response);

    if (response && response.ok) {
      if (response.data.status === 'PENDING') {
        const response = yield call(QuotePolling, {
          api,
          uuid: userInfo.uuid || '',
          transactionID: userInfo.transactionID || '',
          jToken: userInfo.jToken || '',
        });
      }

      if (response.data.status === 'APPROVED') {


      } else {

      }

    } else {

    }
  } catch (error) {
    console.log(" ERROR >> ", error);
  }
};

export function* loanGetCLOC(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.loan.getCLOC, {
      id: userInfo.id,
      jToken: userInfo.jToken,
      uuid: userInfo.uuid
    });
console.log("loanGetCLOC  ", response);
    if (response && response.ok) {
      yield put(LoanActions.loanUpdate({
        cloc: response.data
      }));
    }

  } catch (error) {
    console.log(" ERROR >> ", error);
  }
};

export function* loanCreateCLOC(api, action) {
  const { userInfo } = action;

console.log(" LOAN_CREATE_CLOC >> ", userInfo);

  try {
    const response = yield call(api.loan.createCLOC, {
      jToken: userInfo.jToken,
      uuid: userInfo.uuid,
      payload: userInfo.clocPayload
    });

console.log("response >> ", response)
    if (response && response.ok) {
      if (response.data && response.data.code === 4001) {
        yield put(LoanActions.loanUpdate({
          clocMessage: response.data.message,
          hasCLOC: true
        }));
      } else {
        yield put(LoanActions.loanUpdate({
          cloc: response.data,
          clocID: response.data.id
        }));
      }
    } else {

    }

  } catch (error) {
    console.log(" ERROR >> ", error);
  }
};

export function* loanGetCLOCActive(api, action) {
  const { userInfo } = action;

  try {
    const response = yield call(api.loan.getCLOCActive, {
      jToken: userInfo.jToken,
      uuid: userInfo.uuid
    });

console.log(" loanGetCLOCActive >>> ", response);

    if (response && response.ok) {
      yield put(LoanActions.loanUpdate({
        cloc: response.data,
        clocID: response.data.id
      }));
      if (response.data && response.data.code === 4000) {
        yield put(LoanActions.loanUpdate({
          hasCLOC: false
        }));
      } else if (response.data && response.data.code === 4001){
        yield put(LoanActions.loanUpdate({
          hasCLOC: true
        }));
      }
    }
  } catch (error) {
    console.log(" ERROR >> ", error);
  }
};
