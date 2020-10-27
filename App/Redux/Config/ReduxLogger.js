export default {
  collapsed: true,

  timestamp: true,

  // only log in development mode
  predicate: () => __DEV__,

  // transform immutable action payloads to plain objects
  actionTransformer: action =>
    action && action.payload && action.payload.toJS
      ? {...action, payload: action.payload.toJS()}
      : action
};
