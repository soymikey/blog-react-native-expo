import axios from "axios";
import alert from "./alert.js";
import { AsyncStorage } from "react-native";
// import NProgress from 'nprogress'

// 'http://119.23.201.183:4001'

const instance = axios.create({
  baseURL: "https://blog.migaox.com",
  timeout: 10000 // 请求超时时间
});

let timer;

//拦截请求
instance.interceptors.request.use(
  async config => {
    config.url = "/api" + config.url;
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.common.Authorization = "Bearer " + token;
    }

    return config;
  },
  error => {
    alert(error);
    Promise.reject(error);
  }
);
// //拦截响应
instance.interceptors.response.use(
  response => {
    

    if (response.data.code !== 200) {
      response.message && alert("", response.message);

      return Promise.reject(response.data);
    }
    return response.data;
  },
  err => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (err && err.response) {
        alert(err);
        switch (err.response.status) {
          case 400:
            alert("请求错误", "错误请求");
            break;
          case 401:
            await AsyncStorage.clear();
            alert("请求错误", "登录信息过期或未授权，请重新登录！");
            break;
          case 403:
            alert("请求错误", "拒绝访问！");
            break;
          case 404:
            alert("请求错误", "请求错误,未找到该资源！");
            break;
          case 500:
            alert("请求错误", "服务器出问题了，请稍后再试！");
            break;
          default:
            alert("请求错误", `连接错误 ${err.response.status}！`);
            break;
        }
      } else {
        alert("请求错误", "服务器出了点小问题，请稍后再试！");
      }
    }, 200); // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err);
  }
);
// instance.interceptors.response.use(
//   response => {
//     if (response.data.code !== 200) {
//       //   response.message && message.warning(response.message);
//       alert("请求不等于200");
//       return Promise.reject(response.data);
//     }
//     return response.data;
//   },
//   err => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       if (err && err.response) {
//         alert(err);
//         // switch (err.response.status) {
//         //   case 400:
//         //     // message.error("错误请求");
//         //     break;
//         //   case 401:
//         //     // localStorage.clear();
//         //     // message.error("登录信息过期或未授权，请重新登录！");
//         //     break;
//         //   case 403:
//         //     // message.error("拒绝访问！");
//         //     break;
//         //   case 404:
//         //     // message.error("请求错误,未找到该资源！");
//         //     break;
//         //   case 500:
//         //     // message.error("服务器出问题了，请稍后再试！");
//         //     break;
//         //   default:
//         //     // message.error(`连接错误 ${err.response.status}！`);
//         //     break;
//         // }
//       } else {
//         // message.error("服务器出了点小问题，请稍后再试！");
//       }
//     }, 200); // 200 毫秒内重复报错则只提示一次！

//     return Promise.reject(err);
//   }
// );

export default instance;
