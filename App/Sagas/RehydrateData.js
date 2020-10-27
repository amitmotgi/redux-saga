/*
* Listen REDUX_PERSIST get Storage to store
* */
import {put} from 'redux-saga/effects';
import { EventRegister } from 'react-native-event-listeners';

import LanguageActions from '../Redux/Language';

export function* RehydrateData(action) {
  const { payload = {} } = action;
  const { language } = payload;

  const lang = language && language.lang || 'EN';
  if (lang) {
    EventRegister.emit('languageReset', { data: lang });
    yield put(LanguageActions.languageSet(lang));
  }
}
