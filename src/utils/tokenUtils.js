import { getCookie, setCookie, deleteCookie } from "./cookieUtils";
import store from "../store.js";

const tokenKey = "USER_ACCESS_TOKEN";

export function deleteToken() {
  deleteCookie(tokenKey)
  store.commit("setIsSignIn", false)
  store.commit("setAccessToken", null)
  store.commit("setUserName", null)
  store.commit("setUserAvatar", null)
}

export function setToken(tokenValue, expiredSeconds) {
  // console.log("==set token begin==");
  setCookie(tokenKey, tokenValue, expiredSeconds);
  store.commit("setIsSignIn", true);
  store.commit("setAccessToken", tokenValue);

  // console.log("==set token end==");
}

export function getToken() {
  return getCookie(tokenKey);
}

export function signOut() {
  deleteCookie(tokenKey)
  store.commit("setIsSignIn", false)
  store.commit("setAccessToken", null)
  store.commit("setUserName", null)
  store.commit("setUserAvatar", null)
  store.commit("setUserRole", null)

  localStorage.removeItem("userIsSignIn");
  localStorage.removeItem("userAccessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userAvatar");
  localStorage.removeItem("userRole");
}

export function signIn(user) {
  // console.log("==set token begin==");
  setCookie(tokenKey, user.accessToken, user.expiredSeconds);
  store.commit("setIsSignIn", true);
  store.commit("setAccessToken", user.accessToken);
  store.commit("setUserName", user.name);
  store.commit("setUserAvatar", user.avatar);
  store.commit("setUserRole", user.role);

  localStorage.setItem("userIsSignIn", store.getters.userIsSignIn);
  localStorage.setItem("userAccessToken", store.getters.userAccessToken);
  localStorage.setItem("userName", store.getters.userName);
  localStorage.setItem("userAvatar", store.getters.userAvatar);
  localStorage.setItem("userRole", store.getters.userRole);
  // console.log("==set token end==");
}
