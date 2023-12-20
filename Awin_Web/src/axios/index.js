// src/axios/index.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // 设置你的 API 地址
  timeout: 10000, // 设置超时时间为10秒

});


// 如果环境变量可用，则用环境变量覆盖默认基本URL
// axiosInstance.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || axiosInstance.defaults.baseURL;

export default axiosInstance;
