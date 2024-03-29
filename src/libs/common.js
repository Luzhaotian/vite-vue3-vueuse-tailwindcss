import { getQueryParams } from "@/utils/url.js";

/**
 * @returns {string} lang
 */
export function getLang() {
  return getQueryParams(window.location.href)?.lang ?? "CN";
}
