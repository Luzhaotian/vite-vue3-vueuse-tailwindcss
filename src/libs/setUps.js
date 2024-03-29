import Cookies from "js-cookie";

const TokenKey = "USER_TOKEN";
const UserNameKey = "USER_INFO";
const CustomerIdKey = "CUSTOMER_ID";
const UserName = "username";
const Lang = "lang";

export function cookieGetLang() {
  return Cookies.get(Lang);
}

export function cookieSetLang(language) {
  return Cookies.set(Lang, language, { expires: 30 });
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 30 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserName() {
  return Cookies.get(UserNameKey);
}

export function setUserName(userName) {
  return Cookies.set(UserNameKey, userName, { expires: 30 });
}

export function getBrpUserName() {
  return Cookies.get(UserName);
}

export function setBrpUserName(userName) {
  return Cookies.set(UserName, userName, { expires: 30 });
}

export function removeUserName() {
  return Cookies.remove(UserNameKey);
}

export function getCustomerId() {
  return Cookies.get(CustomerIdKey);
}

export function setCustomerId(userName) {
  return Cookies.set(CustomerIdKey, userName, { expires: 30 });
}

export function removeCustomerId() {
  return Cookies.remove(CustomerIdKey);
}
