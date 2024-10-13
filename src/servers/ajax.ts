import { message } from 'antd';
import axios from 'axios';
import { getToken } from '../utills/user-token';

// 定义响应数据类型
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

// 定义具体的数据类型
export type ResDataType = {
  [key: string]: any; 
};

const instance = axios.create({
  timeout: 10 * 1000,
});
// 请求拦截去： 每次请求都需要带上token
instance.interceptors.request.use(
  config => {
    // 获取token
    const token = getToken()
    // 添加token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // jwt 的格式
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)
// 响应拦截器：统一处理 errno 和 msg
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {} as ResDataType); // 确保 resData 是对象
    const { errno, data = {}, msg } = resData;

    if (errno !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }

    return data;
  }
);

export default instance;