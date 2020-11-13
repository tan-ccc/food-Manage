import router from "@/router/index";
import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { clearSession, getSession } from "@/utils/storage";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 token
    if (getSession("token")) {
      config.headers.common["Authorization"] = `${getSession("token")}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code != 0) {
      Message.error(res.message);
      return Promise.reject(service.interceptors.response.error);
    } else {
      return response.data;
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      Message.error("网络超时");
    } else if (error.message == "Network Error") {
      Message.error("网络连接错误");
    } else {
      if (error.response.status == 401) {
        const message = "";
        if (error.response.data.status == "4001") {
          message = "您的号已在别处登录";
        } else {
          message = "登录超时，请重新登录";
        }
        // 清除浏览器全部临时缓存
        clearSession();
        router.push("/login");
        MessageBox.alert({
          title: "提示",
          message
        }).then(() => {
          // 清空地址栏多余参数
          window.location.href = "/";
        });
      } else {
        if (error.response.data.message) {
          Message.error(error.response.data.message);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default service;
