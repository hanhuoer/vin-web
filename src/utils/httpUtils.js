import axios from "axios";
import { deleteToken, getToken } from "../utils/tokenUtils.js";
import AuthCode from "../system/contant";
import router from "../router";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://127.0.0.1:28888";
} else if (process.env.NODE_ENV === "test") {
  axios.defaults.baseURL = "http://127.0.0.1:28888";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://domain/";
}

axios.defaults.timeout = 1000 * 60 * 3;

axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.headers = {
      "Content-Type": "application/json",
      withCredentials: true
    };

    if (getToken() !== null) {
      config.headers["X-Auth-Token"] = getToken();
    }
    return config;
  },
  error => {
    return Promise.error(error);
  });

axios.interceptors.response.use(response => {
    for (let authCodeKey in AuthCode) {
      if (response.data.code === AuthCode[authCodeKey].code) {
        // window.open("/login");
        router.push("/login");
        deleteToken();
      }
    }
    return response;
  },
  error => {
    // console.log("error " + error);
    return Promise.reject(error);
  }
);

export default axios;
