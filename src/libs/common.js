import { getQueryParams } from "@/utils/url.js";
import { localStorageSetItem, languageObject } from "@/utils/storage.js";

/**
 * @returns {string} lang
 */
export function getLang() {
  const lang = getQueryParams(window.location.href)?.lang ?? "zh-CN";
  localStorageSetItem(languageObject.USER_LOCALE, lang);
  return lang;
}
