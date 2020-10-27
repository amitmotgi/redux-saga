import React, {Component} from 'react';
import { BackHandler, Platform } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';

/* TODO - right now to fix the ordering of calls
createReactNavigationReduxMiddleware is invoked here..*/
/* ------------- Navigation Middleware ------------ */
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const App = reduxifyNavigator(AppNavigation, 'root');

//const mapStateToProps = state => ({ ...state, nav: state.nav });
const mapStateToProps = (state) => ({
  state: state.nav,
});

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
};

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(App);

class ReduxNavigation extends Component {
  componentWillMount () {
    if (Platform.OS === 'ios') {
      return;
    }
    BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);

  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') {
      return;
    }
    BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress);
  }

  hardwareBackPress = () => {
    const { dispatch, state: nav } = this.props;
    // change to whatever is your first screen, otherwise unpredictable results may occur
    if (nav.routes.length === 1 && nav.routes[0].routeName === 'Dashboard') {
      return false;
    }
    dispatch({ type: 'Navigation/BACK' });
    if (nav.routes.length === 1) {
      BackHandler.exitApp();
    }
    // if (shouldCloseApp(nav)) return false
    return true;
  }

  render () {
    return (
      <AppWithNavigationState />
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigation);
