import axios from "axios";
import { deleteToken, getToken, signOut } from "../utils/tokenUtils.js";
import AuthCode from "../system/contant";
import router from "../router";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://127.0.0.1:28888";
} else if (process.env.NODE_ENV === "test") {
  baseURL = "http://127.0.0.1:28888";
} else if (process.env.NODE_ENV === "production") {
  // baseURL = "http://api.scoder.club/";
  baseURL = "http://blog.scoder.club";
}

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});


// request interceptor
service.interceptors.request.use(
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
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(response => {
    for (let authCodeKey in AuthCode) {
      if (response.data.code === AuthCode[authCodeKey].code) {
        router.push("/login");
        signOut();
      }
    }
    return response.data;
  },
  error => {
    // console.log("error " + error);
    return Promise.reject(error);
  }
);


export default service;
