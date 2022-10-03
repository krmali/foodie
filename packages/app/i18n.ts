import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nInit } from 'api/i18n/i18next';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init(i18nInit);
