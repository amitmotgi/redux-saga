import { takeLatest, takeEvery, all, fork, select } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';
import * as TYPES from '../Constants/Types';
/* ------------- Types ------------- */

import { OnboardingTypes } from '../Redux/Onboarding';
import { LoanTypes } from '../Redux/Loan';
import { WalletTypes } from '../Redux/Wallet';
import { WithdrawTypes } from '../Redux/Withdraw';
import { RepayTypes } from '../Redux/Repay';
import { PaymentTypes } from '../Redux/Payment';
import { TransactionTypes } from '../Redux/Transaction';

/* ------------- Sagas ------------- */

import {
  signup,
  mobileVerify,
  login,
  verifyImages,
  validateTransaction,
  fetchCountriesList,
  verifyIdentity,
  registerPushNotification,
  resendCodeToMobile,
  getUser,
  codeStartSMS,
  passwordReset
} from './Onboarding';

import {
  fetchRealtimeCrytoQuote,
  loanGetSettings,
  loanCreateQuote,
  loanGetQuote,
  loanGetCLOC,
  loanCreateCLOC,
  loanGetCLOCActive
} from './Loan';

import {
  walletGetAddresses
} from './Wallet';

import {
  withDrawPayment
} from './Withdraw';

import {
  repayment
} from './Repay';

import {
  getCards,
  addCards,
  getKey
} from './Payment';

import {
  getTransactions
} from './Transaction';

import { RehydrateData } from './RehydrateData';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  try {
    yield all([
      // ONBOARDING
      takeLatest('persist/REHYDRATE', RehydrateData),
      takeLatest(OnboardingTypes.ONBOARDING_REGISTER_USER, signup, api),
      takeLatest(OnboardingTypes.ONBOARDING_MOBILE_VERIFY, mobileVerify, api),
      takeLatest(OnboardingTypes.ONBOARDING_RESEND_CODE_TO_MOBILE,resendCodeToMobile, api),
      takeLatest(OnboardingTypes.ONBOARDING_LOGIN, login, api),
      takeLatest(OnboardingTypes.ONBOARDING_VERIFY_IDENTITY_IMAGES, verifyImages, api),
      takeEvery(OnboardingTypes.ONBOARDING_VERIFY_TRANSACTION, validateTransaction, api),
      takeLatest(OnboardingTypes.ONBOARDING_FETCH_COUNTRIES, fetchCountriesList, api),
      takeLatest(OnboardingTypes.ONBOARDING_VERIFY_IDENTITY, verifyIdentity, api),
      takeLatest(OnboardingTypes.ONBOARDING_REGISTER_PUSH_NOTIFICATION, registerPushNotification, api),
      takeLatest(OnboardingTypes.ONBOARDING_GET_USER, getUser, api),
      takeLatest(OnboardingTypes.ONBOARDING_CODE_START_SMS, codeStartSMS, api),
      takeLatest(OnboardingTypes.ONBOARDING_PASSWORD_RESET, passwordReset, api),

      // LOAN Origination
      takeEvery(LoanTypes.LOAN_FETCH_REALTIME_CRYPTO_QUOTE, fetchRealtimeCrytoQuote, api),
      takeLatest(LoanTypes.LOAN_GET_LTV, loanGetSettings, api),
      takeLatest(LoanTypes.LOAN_CREATE_QUOTE, loanCreateQuote, api),
      takeLatest(LoanTypes.LOAN_GET_QUOTE, loanGetQuote, api),
      takeLatest(LoanTypes.LOAN_GET_CLOC, loanGetCLOC, api),
      takeLatest(LoanTypes.LOAN_CREATE_CLOC, loanCreateCLOC, api),
      takeLatest(LoanTypes.LOAN_GET_CLOC_ACTIVE, loanGetCLOCActive, api),

      // WALLET
      takeLatest(WalletTypes.WALLET_GET_ADDRESSES, walletGetAddresses, api),

      // REPAY
      takeLatest(RepayTypes.REPAY_PAYMENT, repayment, api),

      // WITHDRAW
      takeLatest(WithdrawTypes.WITH_DRAW_PAYMENT, withDrawPayment, api),

      // PAYMENT
      takeLatest(PaymentTypes.PAYMENT_GET_CARDS, getCards, api),
      takeLatest(PaymentTypes.PAYMENT_ADD_CARDS, addCards, api),
      takeLatest(PaymentTypes.PAYMENT_GET_KEY, getKey, api),

      // TRANSACTIONS
      takeLatest(TransactionTypes.TRANSACTION_GET_ALL, getTransactions, api)

      // takeLatest(PaymentTypes.PAYMENT_UPDATE, paymentUpdate, api),
      // takeLatest(PaymentTypes.PAYMENT_CREATE_KEY, paymentCreateKey, api),
      // takeLatest(PaymentTypes.PAYMENT_RETRIVE_KEY, paymentRetriveKey, api),
      // takeLatest(PaymentTypes.PAYMENT_DELETE_KEY, paymentDeleteKey, api),
      // takeLatest(PaymentTypes.PAYMENT_CREATE_ACCOUNT, paymentCreateAccount, api),
      // takeLatest(PaymentTypes.PAYMENT_RETRIVE_ACCOUNT, paymentRetriveAccount, api),
      // takeLatest(PaymentTypes.PAYMENT_CREATE_TRANSACTION, paymentCreateTransaction, api),
      // takeLatest(PaymentTypes.PAYMENT_RETRIVE_TRANSACTION, paymentRetriveTransaction, api),
      // takeLatest(PaymentTypes.PAYMENT_RETRIVE_CLIENT, paymentRetriveClient, api),

    ]);
  } catch (err) {
    console.log(' ROOT ERROR >>>', err);
  }

}
