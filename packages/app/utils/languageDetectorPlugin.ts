import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { LanguageDetectorAsyncModule } from "i18next";
import { I18nManager } from "react-native";

const STORE_LANGUAGE_KEY = "settings.lang";

export const languageDetectorPlugin : LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
            console.log("detecting use language: ", language);
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          let lang = I18nManager.isRTL? 'ar': 'en';
            console.log("detecting use language: ", lang);
          return callback(lang);
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
        console.log("caching user language: ", language);
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};
