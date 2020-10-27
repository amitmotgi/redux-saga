import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  languageSet: ['lang']
});

export const LanguageTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  lang: 'EN'
});

/* ------------- Selectors ------------- */

export const LanguageSelectors = {
  lang: state => state.lang
};

/* ------------- Reducers ------------- */

export const setLanguage = (state, { lang }) => {
  return {
    ...state,
    lang
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LANGUAGE_SET]: setLanguage
});
