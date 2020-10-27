// @flow
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import { EventRegister } from 'react-native-event-listeners';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
i18n.fallbacks = true;

i18n.locale = RNLanguages.language;

// English language is the main language for fall back:
i18n.translations = {
  en: require('./languages/english.json')
};

let languageCode = i18n.locale.substr(0, 2);

const setLanguage = function(code) {
  // All other translations for the app goes to the respective language file:
  switch (code) {
    case 'af':
      i18n.translations.af = require('./languages/af.json');
      break;
    case 'am':
      i18n.translations.am = require('./languages/am.json');
      break;
    case 'ar':
      i18n.translations.ar = require('./languages/ar.json');
      break;
    case 'bg':
      i18n.translations.bg = require('./languages/bg.json');
      break;
    case 'ca':
      i18n.translations.ca = require('./languages/ca.json');
      break;
    case 'cs':
      i18n.translations.cs = require('./languages/cs.json');
      break;
    case 'da':
      i18n.translations.da = require('./languages/da.json');
      break;
    case 'de':
      i18n.translations.de = require('./languages/de.json');
      break;
    case 'el':
      i18n.translations.el = require('./languages/el.json');
      break;
    case 'es':
      i18n.translations.es = require('./languages/es.json');
      break;
    case 'et':
      i18n.translations.et = require('./languages/et.json');
      break;
    case 'fi':
      let addCode = i18n.locale.substr(0, 3);
      if (addCode === 'fil') {
        i18n.translations.fil = require('./languages/fil.json');
      } else {
        i18n.translations.fi = require('./languages/fi.json');
      }
      break;
    case 'fr':
      i18n.translations.fr = require('./languages/fr.json');
      break;
    case 'he':
      i18n.translations.he = require('./languages/he.json');
      break;
    case 'hi':
      i18n.translations.hi = require('./languages/hi.json');
      break;
    case 'hr':
      i18n.translations.hr = require('./languages/hr.json');
      break;
    case 'hu':
      i18n.translations.hu = require('./languages/hu.json');
      break;
    case 'in':
      i18n.translations.in = require('./languages/id.json');
      break;
    case 'id':
      i18n.translations.id = require('./languages/id.json');
      break;
    case 'it':
      i18n.translations.it = require('./languages/it.json');
      break;
    case 'ja':
      i18n.translations.ja = require('./languages/ja.json');
      break;
    case 'ko':
      i18n.translations.ko = require('./languages/ko.json');
      break;
    case 'lt':
      i18n.translations.lt = require('./languages/lt.json');
      break;
    case 'lv':
      i18n.translations.lv = require('./languages/lv.json');
      break;
    case 'ms':
      i18n.translations.ms = require('./languages/ms.json');
      break;
    case 'nb':
      i18n.translations.nb = require('./languages/nb.json');
      break;
    case 'nl':
      i18n.translations.nl = require('./languages/nl.json');
      break;
    case 'no':
      i18n.translations.no = require('./languages/no.json');
      break;
    case 'pl':
      i18n.translations.pl = require('./languages/pl.json');
      break;
    case 'pt':
      i18n.translations.pt = require('./languages/pt.json');
      break;
    case 'ro':
      i18n.translations.ro = require('./languages/ro.json');
      break;
    case 'ru':
      i18n.translations.ru = require('./languages/ru.json');
      break;
    case 'sl':
      i18n.translations.sl = require('./languages/sl.json');
      break;
    case 'sk':
      i18n.translations.sk = require('./languages/sk.json');
      break;
    case 'sr':
      i18n.translations.sr = require('./languages/sr.json');
      break;
    case 'sv':
      i18n.translations.sv = require('./languages/sv.json');
      break;
    case 'sw':
      i18n.translations.sw = require('./languages/sw.json');
      break;
    case 'th':
      i18n.translations.th = require('./languages/th.json');
      break;
    case 'tr':
      i18n.translations.tr = require('./languages/tr.json');
      break;
    case 'uk':
      i18n.translations.uk = require('./languages/uk.json');
      break;
    case 'vi':
      i18n.translations.vi = require('./languages/vi.json');
      break;
    case 'zh':
      i18n.translations.zh = require('./languages/zh.json');
      break;
    case 'zu':
      i18n.translations.zu = require('./languages/zu.json');
      break;
  }
  EventRegister.emit('languageLoaded', {});
};

setLanguage(languageCode);

/* Resetting the i18n Internationalization language */
EventRegister.addEventListener('languageReset', (lang) => {
  var locale = lang && lang.data && lang.data.toLowerCase();
  i18n.locale = locale;
  setLanguage(locale);
});


const missingTranslationRegex = /^\[missing ".*" translation\]$/;

// This function is a wrapper to avoid exception wich leads in a crash
const translateOrFallback = (initialMsg, options = {}) => {
  // We tried to translate something else than a string
  // The native I18n function will simply crash instead of rejecting the attempt with an error message
  if (typeof initialMsg !== 'string') {
    __DEV__ && console.log(`I18n: you must give a string to translate instead of "${typeof initialMsg}"`);

    return ''; // We don't return any message as we don't know what to send
  }

  let localMsg = i18n.t(initialMsg, options);

  // The translation does not exist, the default message is not very sexy
  // Instead we return the message we tried to translate
  if (missingTranslationRegex.test(localMsg)) {
    __DEV__ && console.log(`translation "${initialMsg}" does not exists in translations files`);

    return initialMsg;
  }

  return localMsg;
};

export default {
  ...i18n,
  t: translateOrFallback
};
