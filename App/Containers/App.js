import 'babel-polyfill';
import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import { fromJS } from 'immutable';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import 'core-js/es6/set';
import {
  Linking,
  Platform,
  NetInfo,
  AppState,
  StatusBar,
} from 'react-native';
//import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Timer from 'react-native-timer';
import RNLanguages from 'react-native-languages';
import i18n from '../I18n';
import {
  BiometryDetection
} from '../Common/Helper/Biometry';
import {
  GetUserreduxsagaentials
} from '../Common/Helper/reduxsagaentials';
import PushNotification from 'react-native-push-notification';
import UserActions from '../Redux/User';
import branch, { BranchEvent } from 'react-native-branch';

// Added to fix issue https://github.com/facebook/react-native/issues/9599
if (global && !global.self) {
  global.self = global;
}

// create our store
const store = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    /*
      * Initiating Critical Biometry Detection
      * - Identify device supports FaceID, TouchID OR NoID
    */
    const { dispatch } = store;
    //BiometryDetection(dispatch);

    branch.subscribe(({ error, params }) => {
      console.log(" branch >> ", branch);
      console.log(" branch params >> ", params);
      console.log(" branch error >> ", error);

      if (params && params['+non_branch_link']) {
        const nonBranchUrl = params['+non_branch_link']
        // Route non-Branch URL if appropriate.
        return
      }

      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }
      // params will never be null if error is null
    })

    RNLanguages.addEventListener('change', this._onLanguagesChange);

    AppState.addEventListener('change', this.manageAppState);

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });

    NetInfo.addEventListener(
      'connectionChange',
      this.manageConnectivityChange
    );
    if (Platform.OS === 'android') {
      //AndroidKeyboardAdjust.setAdjustNothing();
    }
    // this handles the case where the app is closed and is launched via Universal Linking.
    Linking.getInitialURL()
        .then((url) => {
          if (url) {
            // Alert.alert('GET INIT URL','initial url  ' + url)
            //this.resetStackToProperRoute(url)
          }
        }).catch((e) => {});

    // This listener handles the case where the app is woken up from the Universal or Deep Linking
    Linking.addEventListener('url', this.appWokeUp);

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
          dispatch(UserActions.authenticateUser({
            deviceToken: token
          }));
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            // process the notification
            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: 'YOUR GCM (OR FCM) SENDER ID',

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });

  }

  componentWillUnmount() {
    Timer.clearTimeout(this);

    AppState.removeEventListener('change', this.manageAppState);
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.manageConnectivityChange
    );
  }

  _onLanguagesChange = ({ language }) => {
    i18n.locale = language;
  }

  appWokeUp = (event) => {
    // this handles the use case where the app is running in the background and is activated by the listener...
    // Alert.alert('Linking Listener','url  ' + event.url)
    //this.resetStackToProperRoute(event.url)
  }

  manageAppState(nextAppState) {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      Timer.clearTimeout(this);
      return;
    } else if (nextAppState === 'active') {
      // When the App wakes up validate if the token is valid
      // TODO - we need to API that validates
      // 1) Validate if the token is valid
      // 2) If token is valid, then we need to request for token extension
      /*
        * Initiating Critical Biometry Detection
        * - Identify device supports FaceID, TouchID OR NoID
      */
      const { dispatch } = store;
      //BiometryDetection(dispatch);

    }
  }

  manageConnectivityChange(isConnected) {
    // dispatch an action to manage session
    console.log('isConnected >>> ', isConnected);
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App;
