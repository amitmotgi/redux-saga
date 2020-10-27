import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import ReduxPersist from '../Config/ReduxPersist';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import AppNavigation from '../Navigation/AppNavigation';
import { fromJS, toJS, Map } from 'immutable';


// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
// const getImmutable = (child, key) => child ? child.get(key) : void 0;
// const setImmutable = (child, key, value) => child.set(key, value);
//
const navReducer = createNavigationReducer(AppNavigation);

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  language: require('./Language').reducer,
  onboarding: require('./Onboarding').reducer,
  user: require('./User').reducer,
  distribution: require('./Distribution').reducer,
  loan: require('./Loan').reducer,
  wallet: require('./Wallet').reducer,
  payment: require('./Payment').reducer,
  repay: require('./Repay').reducer,
  withdraw: require('./Withdraw').reducer,
  transaction: require('./Transaction').reducer,
  nav: navReducer
});

export default () => {
  let finalReducers = reducers;

  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      let nextRootReducer = require('./').reducers;
      if (ReduxPersist.active) {
        const persistConfig = ReduxPersist.storeConfig;
        nextRootReducer = persistReducer(persistConfig, reducers);
      }

      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
