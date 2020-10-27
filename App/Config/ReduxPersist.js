import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';
import {
  AsyncStorage,
  Platform
} from 'react-native';
import AppDetails from '../Constants/AppDetails';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: AppDetails.appVersion,
  storeConfig: {
    key: 'reduxsaga:Latest',
    storage: AsyncStorage,

    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['nav', '_persist'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // whitelist: [],
    transforms: [immutablePersistenceTransform],

    // Reducer keys that you want stored to persistence here.
    whitelist: ['language', 'user', 'onboarding', 'loan', 'payment', 'wallet', 'repay', 'withdraw']
  }
};

export default REDUX_PERSIST;
