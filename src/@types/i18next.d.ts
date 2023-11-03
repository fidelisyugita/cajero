import 'i18next';

import id from '../translations/resources/en.json';
import en from '../translations/resources/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: 'en';
    resources: {
      en: typeof en;
      id: typeof id;
    };
  }
}
