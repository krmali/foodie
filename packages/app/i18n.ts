import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nInit } from 'api/i18n/i18next';
import { languageDetectorPlugin } from './utils/languageDetectorPlugin';

i18next
    .use(initReactI18next)
    .use(languageDetectorPlugin)
    .init(i18nInit);
