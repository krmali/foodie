import i18next, { InitOptions, TFunction } from "i18next";
import { arTranslations } from "./ar";
import { enTranslations } from "./en";

export const i18nInit : InitOptions = {
    // debug: true,
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
        en: enTranslations,
        ar: arTranslations
    }
}

// declare global {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var t: TFunction | undefined;
// }
//
// export const t =
//     global.t ||
//     i18next.createInstance(i18nInit).t
