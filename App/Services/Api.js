// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import {
  Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// TODO add the production endpoints here
// const hostName = 'https://libra.91koin.com';
// const url =  hostName + '/lendApi/api/libra/v2/';
const hostName = __DEV__ ? 'https://qa.myreduxsaga.io'
  : 'https://qa.myreduxsaga.io';
const url = hostName;
const country = DeviceInfo.getDeviceCountry();

// our "constructor"
const create = (baseURL = url) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Country': country || 'US',
      'Timestamp': Math.round((new Date()).getTime() / 1000)
    },
    // 60 second timeout...
    timeout: 120000
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // ONBOARDING APIs
  const signUp = (data) => {
    var host = 'https://api-dev.myreduxsaga.io';

    api.setHeaders({
      'Authorization': 'Bearer ' + ' ',
    });
    api.setBaseURL(host + '/api/v1/users');
    return api.post('/signup', {
      user_name: data.username || '',
      password: data.password || '',
      mobile_number: data.mobileNumber || '',
      country_code: data.countryCode || '',
      verification_request: {
        start: true,
        delivery_mode: 'SMS'
      },
      tc_enabled: data.tcEnabled || false
    });
  };

  const mobileVerify = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.post(data.uuid + '/verify/sms', {
      token: data.token || ''
    });
  };

  const codeStartSMS = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + !data.jToken ? ' ' : data.jToken,
    });

    return api.post('start/sms', {
      user_name: data.username || ''
    });
  };

  const passwordReset = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + ' ',
    });

    return api.post('/reset/password', {
      new_password: data.newpassword || '',
      token: data.token,
      user_name: data.username,
      verification_request: {
        start: true,
        delivery_mode: "SMS"
      }
    });
  };

  const resendCodeToMobile = (data) => {
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.post('start/sms/', {
      user_name: data.username || ''
    });
  };

  const registerUser = (data) => {
    api.setBaseURL(hostName + '/lendApi/api/libra/v2/');
    return api.post('account/request_send_email_verification_code', {
      email: data.email,
      reason: 'REGISTER'
    });
  };

  const codeVerify = (data) => {
    api.setBaseURL(hostName + '/lendApi/api/libra/v2/');

    return api.post('account/register_by_email', {
      email: data.email || '',
      password: data.password || '',
      verificationCode: data.code || ''
    });
  };

  const login = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    //https://api-dev.myreduxsaga.io
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + ' ',
    });

    return api.post('auth/login', {
      user_name: data.username || '',
      password: data.password || ''
    });
  };

  const getUser = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get('users/' + data.uuid);
  };

  const verifyImages = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';

    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    var payload = {
      AcceptTruliooTermsAndConditions: data.cameraAcceptAgreement,
      CountryCode: country,
      DataFields: {
        Document: {
          DocumentType: data.documentType || '',
          DocumentFrontImage: data.frontImageBase64 || '',
          DocumentBackImage: data.backImageBase64 || ''
        }
      }
    };
    return api.post(data.uuid + '/kyc/verify/documents', payload);
  };

  const validateTransaction = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get(data.uuid + '/kyc/' + data.transactionID);
  };

  const fetchCountries = () => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1');
console.log(" API fetchCountries")
    api.setHeaders({
      'Authorization': 'Bearer ' + '',
    });

    return api.get('/kyc/account/document/countries');
  };

  const verifyIdentity = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });
    return api.post(data.uuid + '/kyc/verify/identity', data);
  };

  const registerPushNotification = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });
    return api.post(data.uuid + '/notifications/bind', data.payload);
  };

  // Oracle Realtime Quote Service
  const fetchRealtimeQuote = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName);

    api.setHeaders({
      'Authorization': 'Bearer ' + ' ',
    });
    return api.get('/api/v1/oracle/realtime?symbol=' + data.symbol + '&convert=' + data.convert);
  };

  const getLoanSettings = () => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName);

    api.setHeaders({
      'Authorization': 'Bearer ' + ' ',
    });

    return api.get('/api/v1/settings/ltv');
  };

  const createLoanQuote = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });
    return api.post(data.uuid + '/quote', data.payload);
  };

  const getLoanQuote = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get(data.uuid + '/quote/' + data.transactionID);
  };

  const createCLOC = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.post(data.uuid + '/cloc', data.payload);
  };

  const getCLOC = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });
    return api.get(data.uuid + '/cloc/' + data.id);
  };

  const getCLOCActive = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });
    return api.get(data.uuid + '/cloc/active');
  };


  // WALLET APIs
  const getWalletAddresses = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get(data.uuid + '/wallet/balances/');
  };


  // PAYMENT
  const getCards = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get(data.uuid + '/payment/cards/debit');
  };

  const addCards = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.post(data.uuid + '/payment/cards/debit', data.payload);
  };

  const getKey = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get(data.uuid + '/payment/key');
  };

  // WITHDRAW
  const withDrawPayment = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });
    return api.post(data.uuid + '/cloc/transaction/withdraw', data.payload);
  };

  // REPAYMENT
  const repayment = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');

    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.post(data.uuid + '/cloc/transaction/repayment', data.payload);
  };

  // TRANSACTIONS
  const getTransactions = (data) => {
    var hostName = 'https://api-dev.myreduxsaga.io';
    api.setBaseURL(hostName + '/api/v1/users/');
    api.setHeaders({
      'Authorization': 'Bearer ' + data.jToken,
    });

    return api.get(data.uuid + '/cloc/transaction/');
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    onboarding: {
      signUp,
      mobileVerify,
      codeStartSMS,
      passwordReset,
      resendCodeToMobile,
      registerUser,
      codeVerify,
      login,
      verifyImages,
      validateTransaction,
      fetchCountries,
      verifyIdentity,
      registerPushNotification,
      getUser
    },
    loan: {
      fetchRealtimeQuote,
      getLoanSettings,
      createLoanQuote,
      getLoanQuote,
      createCLOC,
      getCLOC,
      getCLOCActive
    },
    wallet: {
      getWalletAddresses
    },
    vault: {

    },
    payment: {
      getCards,
      addCards,
      getKey
    },
    withdraw: {
      withDrawPayment
    },
    repay: {
      repayment
    },
    transactions: {
      getTransactions
    }
  };
};

// let's return back our create method as the default.
export default {
  create
};
