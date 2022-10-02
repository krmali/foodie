import i18next, { TFunction } from "i18next";
import { arTranslations } from "./ar";
import { enTranslations } from "./en";

export const i18nInit = {
    // debug: true,
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
